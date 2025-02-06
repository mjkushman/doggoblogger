import { Avatar, Box, Typography, Stack, Link } from "@mui/material";
import dayjs from "dayjs";

import removeMd from "remove-markdown";

const PostPreview = ({ postId, title, content, createdAt, authorId }) => {
  const date = dayjs(createdAt).format("MMM DD, YYYY");

  const plainText = removeMd(content) || "";

  return (
    <Box sx={{ mt: 2, t: 2, maxWidth: 700 }}>
      <Link color="inherit" variant="h4" underline="none" href={postId}>
        {title}
      </Link>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Avatar>{authorId.slice(0, 2)}</Avatar>
        <Typography alignContent={"center"}>{date}</Typography>
      </Stack>

      <Box p={2} >
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "5",
            WebkitBoxOrient: "vertical",
          }}
        >
          {plainText}
        </Typography>

        <Link href={postId} color="purple" underline="none" my={1}>
          {" "}
          read more
        </Link>
      </Box>
    </Box>
  );
};

export default PostPreview;
