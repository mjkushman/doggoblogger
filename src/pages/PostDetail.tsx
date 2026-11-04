import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Markdown from "react-markdown";
import Hero from "../components/Hero";
import { postQuery } from "../lib/queries";

const PostDetail = () => {
  const { postId } = useParams() as { postId: string };
  const { data: post } = useSuspenseQuery(postQuery(postId));

  return (
    <>
      <Hero headline={post.title} backgroundImage={post.imageUrl} />
      <Container maxWidth="md">
        <Box sx={{ p: 4 }}>
          <Stack direction="row" spacing={3} alignItems="center" sx={{ p: 3 }}>
            <Avatar>{post.authorId.slice(0, 2)}</Avatar>
            <Typography sx={{ flexGrow: 1 }}>{post.username}</Typography>
            <Typography>{dayjs(post.createdAt).format("MMM DD, YYYY")}</Typography>
          </Stack>
          <Box sx={{ p: 4 }}>
            <Markdown>{post.content}</Markdown>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PostDetail;
