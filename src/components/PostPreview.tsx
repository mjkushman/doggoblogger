import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import removeMd from "remove-markdown";
import type { Post } from "../lib/api";

type Props = Post & {
  /** Larger side-by-side layout used for the newest post */
  featured?: boolean;
};

const PostPreview = ({ postId, title, content, createdAt, username, imageUrl, featured }: Props) => {
  const author = username ?? "Doggoblog";
  const excerpt = removeMd(content ?? "").replace(/\s+/g, " ").trim();

  return (
    <Card component="article" sx={{ height: "100%", "&:hover": { transform: "translateY(-4px)", boxShadow: 6 } }}>
      <CardActionArea
        component={RouterLink}
        to={`/posts/${postId}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: featured ? { xs: "column", md: "row" } : "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: featured ? { md: "0 0 52%" } : "none",
            aspectRatio: featured ? { xs: "16 / 9", md: "auto" } : "16 / 9",
            minHeight: featured ? { md: 340 } : undefined,
            background: imageUrl
              ? `center / cover no-repeat url(${imageUrl})`
              : "linear-gradient(135deg, #738D98 0%, #3E5C69 100%)",
            display: "grid",
            placeItems: "center",
            fontSize: "3rem",
          }}
        >
          {!imageUrl && <span aria-hidden="true">🐾</span>}
        </Box>
        <CardContent sx={{ p: { xs: 2.5, md: featured ? 4.5 : 3 }, display: "flex", flexDirection: "column", flex: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: "primary.main" }}>
              {author.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {author} · {dayjs(createdAt).format("MMM D, YYYY")}
            </Typography>
          </Stack>
          <Typography variant={featured ? "h3" : "h5"} component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: featured ? 4 : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {excerpt}
          </Typography>
          <Typography variant="button" color="secondary" sx={{ mt: 2 }}>
            Read more →
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostPreview;
