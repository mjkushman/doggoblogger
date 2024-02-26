import { useEffect, useState, useContext, lazy, Suspense } from "react";

import AutobloggerApi from "../api";
import { Stack, Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors";
import Loading from "../common/Loading";
// Lazy components
const NewCommentForm = lazy(() => import("./NewCommentForm.jsx"));
const CommentCard = lazy(() => import("./CommentCard.jsx"));

/** On mount, retrieve a list of Comments
 * Render a PostCard for each blog post
 *
 * Use a mechanism to filter the cards. Lists of cards will need to be in state?
 *
 * Later, lazy load can be added so they don't all load at onnce. Needs a "load more" opion.
 */

const CommentList = ({ postId }) => {
  console.debug("CommentList");
  // Should return
  // 1. Filters for the list.
  // 2. A card for each item in the list

  const [comments, setComments] = useState(null);
  const [numComments, setNumComments] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCommentsOnMount() {
    setIsLoading(true);
    getComments();
  }, []);

  async function getComments() {
    try {
      const { numComments, comments } = await AutobloggerApi.getComments(
        postId
      );
      comments.sort((a, b) => a.commentId - b.commentId);
      setComments(comments);

      setNumComments(numComments);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  }

  // Function to create a new comment
  const addComment = async (userId, msg) => {
    let commentData = {
      userId: userId,
      body: msg,
    };

    setIsLoading(true);
    await AutobloggerApi.addComment(postId, commentData);

    getComments(); // fetch comments to update the list
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      {error && <Box>Something messed up: {error}</Box>}
      {numComments} {numComments == 1 ? "Comment" : "Comments"}
      <Stack id="comments" sx={{ backgroundColor: grey[200] }}>
        {console.log("comments in the return", comments)}
        {!isLoading &&
          comments.map(({ commentId, body, username, createdAt }) => (
            <Grid key={commentId}>
              <Suspense fallback={<Loading />}>
                <CommentCard
                  commentId={commentId}
                  body={body}
                  username={username}
                  createdAt={createdAt}
                />
              </Suspense>
            </Grid>
          ))}
      </Stack>
      <Box mx={3} my={2}>
      <Suspense fallback={<Loading/>}>
        <NewCommentForm addComment={addComment} />
      </Suspense>
      </Box>
    </Container>
  );
};

export default CommentList;
