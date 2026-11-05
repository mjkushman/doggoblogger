import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Avatar, Box, Button, Chip, Skeleton, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { api, commentErrorMessage, type Comment } from "../lib/api";
import { commentsQuery } from "../lib/queries";

const NAME_KEY = "doggoblog-commenter-name";
const MAX_COMMENT = 1000;
const MAX_NAME = 50;
const POLL_MS = 2000;
const GIVE_UP_MS = 90_000; // stop waiting for a reply after this long

/** The three bouncing dots shown while the author writes a reply */
const TypingDots = () => (
  <Box component="span" aria-hidden="true" sx={{ display: "inline-flex", gap: 0.5, ml: 0.75 }}>
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        component="span"
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.secondary",
          animation: "bounce 1.2s infinite ease-in-out",
          animationDelay: `${i * 0.15}s`,
          "@keyframes bounce": { "0%, 80%, 100%": { opacity: 0.25 }, "40%": { opacity: 1 } },
        }}
      />
    ))}
  </Box>
);

const CommentItem = ({ comment, nested }: { comment: Comment; nested?: boolean }) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{
      ml: nested ? { xs: 3, sm: 6 } : 0,
      p: 2,
      borderRadius: 3,
      bgcolor: comment.isAgent ? "rgba(181, 80, 26, 0.06)" : "background.paper",
      border: 1,
      borderColor: comment.isAgent ? "rgba(181, 80, 26, 0.18)" : "divider",
      animation: "fade-up 0.35s ease-out both",
    }}
  >
    <Avatar sx={{ width: 36, height: 36, bgcolor: comment.isAgent ? "secondary.main" : "primary.light" }}>
      {comment.authorName.charAt(0).toUpperCase()}
    </Avatar>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Typography fontWeight={600}>{comment.authorName}</Typography>
        {comment.isAgent && <Chip label="Author" size="small" color="secondary" sx={{ height: 20, fontSize: 12 }} />}
        <Typography variant="body2" color="text.secondary">
          {dayjs(comment.createdAt).format("MMM D, YYYY")}
        </Typography>
      </Stack>
      <Typography sx={{ mt: 0.5, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{comment.content}</Typography>
    </Box>
  </Stack>
);

type Props = { postId: string; authorName: string };

const Comments = ({ postId, authorName }: Props) => {
  const queryClient = useQueryClient();
  const queryKey = commentsQuery(postId).queryKey;
  const { data: comments, isLoading, isError } = useQuery(commentsQuery(postId));

  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) ?? "");
  const [content, setContent] = useState("");
  // Set after posting, while the author is writing their reply
  const [pending, setPending] = useState<{ statusId: string; commentId: string } | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  const addComment = useMutation({
    mutationFn: api.addComment,
    onSuccess: ({ comment, reply }) => {
      queryClient.setQueryData<Comment[]>(queryKey, (old) => [...(old ?? []), comment]);
      setContent("");
      setTimedOut(false);
      setPending(reply ? { statusId: reply.statusId, commentId: comment.commentId } : null);
    },
  });

  // Watch the reply's status until the author has finished (or failed, or we give up)
  const { data: replyStatus } = useQuery({
    queryKey: ["reply-status", pending?.statusId],
    queryFn: async () => {
      const status = await api.getReplyStatus(pending!.statusId);
      if (status === "success") await queryClient.invalidateQueries({ queryKey }); // fetch the new reply
      return status;
    },
    enabled: !!pending && !timedOut,
    refetchInterval: (query) =>
      query.state.data === "success" || query.state.data === "error" ? false : POLL_MS,
  });

  // Don't show "writing a reply" forever if it never arrives
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setTimedOut(true), GIVE_UP_MS);
    return () => clearTimeout(timer);
  }, [pending]);

  const isFinished = replyStatus === "success" || replyStatus === "error";
  const isWaiting = !!pending && !timedOut && !isFinished;
  const failedCommentId = pending && (replyStatus === "error" || (timedOut && replyStatus !== "success")) ? pending.commentId : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) localStorage.setItem(NAME_KEY, trimmedName);
    addComment.mutate({ postId, authorName: trimmedName || "Guest", content: content.trim() });
  };

  // Top-level comments, each followed by its replies
  const topLevel = (comments ?? []).filter((c) => !c.parentId);
  const repliesTo = (id: string) => (comments ?? []).filter((c) => c.parentId === id);

  return (
    <Box component="section" aria-labelledby="comments-heading" sx={{ mt: 8 }}>
      <Typography id="comments-heading" variant="h4" component="h2" gutterBottom>
        Comments{comments && comments.length > 0 ? ` (${comments.length})` : ""}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Leave a comment. {authorName} might just write back.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: { xs: 2, sm: 3 }, bgcolor: "background.paper", border: 1, borderColor: "divider", borderRadius: 3 }}
      >
        <Stack spacing={2}>
          <TextField
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            slotProps={{ htmlInput: { maxLength: MAX_NAME } }}
            autoComplete="nickname"
            size="small"
            sx={{ maxWidth: 280 }}
          />
          <TextField
            label="Your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            minRows={3}
            slotProps={{ htmlInput: { maxLength: MAX_COMMENT } }}
            helperText={`${content.length}/${MAX_COMMENT}`}
            FormHelperTextProps={{ sx: { textAlign: "right", mx: 0 } }}
          />
          {addComment.isError && <Alert severity="error">{commentErrorMessage(addComment.error)}</Alert>}
          <Box>
            <Button type="submit" variant="contained" disabled={addComment.isPending || !content.trim()}>
              {addComment.isPending ? "Posting…" : "Post comment"}
            </Button>
          </Box>
        </Stack>
      </Box>

      <Stack spacing={2} sx={{ mt: 4 }} aria-live="polite">
        {isLoading && <Skeleton variant="rounded" height={84} />}
        {isError && <Alert severity="warning">We couldn&apos;t load the comments right now.</Alert>}
        {!isLoading && !isError && topLevel.length === 0 && (
          <Typography color="text.secondary">No comments yet. Be the first to say something.</Typography>
        )}

        {topLevel.map((comment) => (
          <Stack key={comment.commentId} spacing={1.5}>
            <CommentItem comment={comment} />
            {repliesTo(comment.commentId).map((reply) => (
              <CommentItem key={reply.commentId} comment={reply} nested />
            ))}
            {isWaiting && pending?.commentId === comment.commentId && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 3, sm: 6 }, fontStyle: "italic" }}>
                {authorName} is writing a reply
                <TypingDots />
              </Typography>
            )}
            {failedCommentId === comment.commentId && repliesTo(comment.commentId).length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 3, sm: 6 } }}>
                {authorName} couldn&apos;t reply this time.
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;
