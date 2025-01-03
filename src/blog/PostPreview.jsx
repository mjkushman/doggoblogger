import { Avatar, Box, Typography, Stack, Link } from "@mui/material";
import dayjs from "dayjs";

import removeMd from "remove-markdown";

const PostPreview = ({ postId, title, content, createdAt, authorId }) => {
  const date = dayjs(createdAt).format("MMM DD, YYYY");

  const plainText = removeMd(content) || "";

  return (
    <Box sx={{ p: 4, t: 2, maxWidth: 700 }}>
      <Link color="inherit" variant="h4" underline="none" href={postId}>
        {title}
      </Link>
      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Avatar>{authorId.slice(0, 2)}</Avatar>
        <Typography sx={{ flexGlow: 1 }}> {authorId}</Typography>
        <Typography>{date}</Typography>
      </Stack>

      <Box p={4} maxHeight={100}>
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical',
         }}
        >
          {plainText}
        </Typography>
        {
          <Link href={postId} color="purple" underline="none">
            {" "}
            read more
          </Link>
        }
      </Box>
      <Stack direction="row" spacing={3} sx={{ p: 3 }}></Stack>
    </Box>
  );
};

export default PostPreview;
