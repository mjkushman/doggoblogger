import { useParams, Link as RouterLink } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, Box, Container, Link, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Hero from "../components/Hero";
import Prose from "../components/Prose";
import { postQuery } from "../lib/queries";

const WORDS_PER_MINUTE = 200;

const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { data: post } = useSuspenseQuery(postQuery(postId));

  const author = post.username ?? "Doggoblog";
  const minutes = Math.max(1, Math.round(post.content.split(/\s+/).length / WORDS_PER_MINUTE));

  return (
    <>
      <Hero headline={post.title} backgroundImage={post.imageUrl} />
      <Container maxWidth="sm" component="article" sx={{ py: { xs: 4, md: 6 }, animation: "fade-up 0.5s ease-out both" }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ pb: 3, mb: 4, borderBottom: 1, borderColor: "divider" }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>{author.charAt(0).toUpperCase()}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight={600}>{author}</Typography>
            <Typography variant="body2" color="text.secondary">
              {dayjs(post.createdAt).format("MMMM D, YYYY")} · {minutes} min read
            </Typography>
          </Box>
        </Stack>

        <Prose>{post.content}</Prose>

        <Box sx={{ mt: 8, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Link component={RouterLink} to="/" color="secondary" underline="hover" fontWeight={600}>
            ← Back to all posts
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default PostDetail;
