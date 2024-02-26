import { useEffect, useState, lazy } from "react";
// import PostPreview from "./PostPreview";
import AutobloggerApi from "../api";
import { Stack, Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


const PostPreview = lazy(() => import('./PostPreview'))
/** On mount, retrieve a list of blog posts
 * Render a PostCard for each blog post
*
* Use a mechanism to filter the cards. Lists of cards will need to be in state?
*
* Later, lazy load aka infinite scroll can be added to the PostList
*/

const PostList = () => {
  console.debug("PostsList");
  // Should return
  // 1. Filters for the list.
  // 2. A card for each item in the list

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function getPostsOnMount() {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      let res = await AutobloggerApi.getAllPosts();
      res = res.sort((a,b)=> (b.postId - a.postId))
      console.log('POST REST',res)
      setPosts(res);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  }

  return (
    <Container>
      {error && <Box>Something messed up: {error}</Box>}
      <Stack spacing={4} justifyContent="center">
        {posts.map(({postId, titlePlaintext, titleHtml, username, numComments, bodyPlaintext, bodyHtml, postImageUrl, createdAt, authorImageUrl,slug }) => (
      <Grid key={postId}>
        <PostPreview 
          postId={postId} 
          titlePlaintext={titlePlaintext} 
          numComments={numComments} 
          bodyPlaintext={bodyPlaintext}
          createdAt={createdAt}
          username={username}
          authorImageUrl={authorImageUrl}
          slug={slug}/>
        </Grid>)
      )}</Stack>
    </Container>
  );
};

export default PostList;
