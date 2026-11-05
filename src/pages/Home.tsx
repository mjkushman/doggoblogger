import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Hero from "../components/Hero";
import PostPreview from "../components/PostPreview";
import { postsQuery } from "../lib/queries";

const POSTS_PER_PAGE = 6;

const SectionTitle = ({ children }: { children: string }) => (
  <Typography
    variant="overline"
    component="h2"
    color="text.secondary"
    sx={{ display: "block", mb: 2, letterSpacing: "0.12em", fontWeight: 600 }}
  >
    {children}
  </Typography>
);

const Home = () => {
  const { data: posts } = useSuspenseQuery(postsQuery);
  const [page, setPage] = useState(1);

  const [latest, ...rest] = posts;
  const start = (page - 1) * POSTS_PER_PAGE;
  const pageCount = Math.ceil(rest.length / POSTS_PER_PAGE);

  return (
    <>
      <Hero headline="Doggoblog" subtitle="Strong opinions, written entirely by dogs." size="lg" />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {!latest ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h4" gutterBottom>
              No posts yet
            </Typography>
            <Typography color="text.secondary">
              Our authors are still warming up. Check back soon.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={7}>
            <Box sx={{ animation: "fade-up 0.5s ease-out both" }}>
              <SectionTitle>Latest post</SectionTitle>
              <PostPreview {...latest} featured />
            </Box>

            {rest.length > 0 && (
              <Box>
                <SectionTitle>More posts</SectionTitle>
                <Grid container spacing={3}>
                  {rest.slice(start, start + POSTS_PER_PAGE).map((post) => (
                    <Grid key={post.postId} size={{ xs: 12, sm: 6, md: 4 }}>
                      <PostPreview {...post} />
                    </Grid>
                  ))}
                </Grid>
                {pageCount > 1 && (
                  <Stack alignItems="center" sx={{ mt: 5 }}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      color="primary"
                      shape="rounded"
                      onChange={(_, p) => setPage(p)}
                    />
                  </Stack>
                )}
              </Box>
            )}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Home;
