import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import Api from "../api";
import { Stack, Box, Container, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

// const PostPreview = lazy(() => import('./PostPreview'))
/** On mount, retrieve a list of blog posts
 * Render a PostCard for each blog post
 *
 * Use a mechanism to filter the cards. Lists of cards will need to be in state?
 *
 * Later, lazy load aka infinite scroll can be added to the PostList
 */

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // which page being viewed
  const [postsPerPage] = useState(5); // number of posts to show per per page

  useEffect(function getPostsOnMount() {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      await Api.getAllPosts().then((posts) =>
        setPosts(
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      );
    } catch (err) {
      console.log(err);
      setError(error);
    }
  }

  // code to paginage

  const indexOfEndPost = currentPage * postsPerPage; // Determine which index to stop before showing. This index does not get displayed
  const indexOfFirstPost = indexOfEndPost - postsPerPage; // Determine index of first post to display. This post gets displayed.
  const currentPosts = posts.slice(indexOfFirstPost, indexOfEndPost); // this creates the spread of viewable posts, aka the page

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  //paginagtion code ends

  return (
    <Container>
      {error && <Box>Something messed up: {error}</Box>}
      <Stack spacing={4} justifyContent="center" alignItems="center">
        {currentPosts.map(
          ({ postId, title, content, createdAt, slug, authorId }) => (
            <Grid key={postId}>
              <PostPreview
                postId={postId}
                title={title}
                content={content}
                createdAt={createdAt}
                authorId={authorId}
                slug={slug}
              />
            </Grid>
          )
        )}
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          showFirstButton
          showLastButton
          onChange={handlePageChange}
        />
      </Stack>
    </Container>
  );
};

export default PostList;
