import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Typography, Stack, Link } from "@mui/material";
import dayjs from "dayjs";
import removeMd from "remove-markdown";
import type { Post } from "../lib/api";

const PostPreview = ({ postId, title, content, createdAt, authorId }: Post) => {
  const to = `/posts/${postId}`;
  return (
    <Box sx={{ mt: 2, maxWidth: 700 }}>
      <Link component={RouterLink} to={to} color="inherit" variant="h4" underline="none">
        {title}
      </Link>
      <Stack direction="row" spacing={2} sx={{ p: 2 }} alignItems="center">
        <Avatar>{authorId.slice(0, 2)}</Avatar>
        <Typography>{dayjs(createdAt).format("MMM DD, YYYY")}</Typography>
      </Stack>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
        >
          {removeMd(content ?? "")}
        </Typography>
        <Link component={RouterLink} to={to} color="secondary" underline="none" sx={{ my: 1, display: "inline-block" }}>
          read more
        </Link>
      </Box>
    </Box>
  );
};

export default PostPreview;
