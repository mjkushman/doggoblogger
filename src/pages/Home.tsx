import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Container, Pagination, Stack } from "@mui/material";
import Hero from "../components/Hero";
import PostPreview from "../components/PostPreview";
import { postsQuery } from "../lib/queries";

const POSTS_PER_PAGE = 5;

const Home = () => {
  const { data: posts } = useSuspenseQuery(postsQuery);
  const [page, setPage] = useState(1);
  const start = (page - 1) * POSTS_PER_PAGE;

  return (
    <>
      <Hero headline="Doggoblog" size="lg" />
      <Container>
        <Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
          {posts.slice(start, start + POSTS_PER_PAGE).map((post) => (
            <PostPreview key={post.postId} {...post} />
          ))}
          <Pagination
            count={Math.ceil(posts.length / POSTS_PER_PAGE)}
            page={page}
            showFirstButton
            showLastButton
            onChange={(_, p) => setPage(p)}
          />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
