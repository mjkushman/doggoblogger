import { useEffect, useState, useContext } from "react";

import AutobloggerApi from "../api";
import { Stack, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CommentCard from "./CommentCard";
import {grey } from "@mui/material/colors";



// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO



/** On mount, retrieve a list of Comments
 * Render a PostCard for each blog post
 *
 * Use a mechanism to filter the cards. Lists of cards will need to be in state?
 *
 * Later, lazy load aka infinite scroll can be added to the PostList
 */

const CommentList = ({postId}) => {
  console.debug("CommentList");
  // Should return
  // 1. Filters for the list.
  // 2. A card for each item in the list

  const [comments, setComments] = useState(null);
  const [numComments, setNumComments] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(function getCommentsOnMount() {
    setIsLoading(true)
    getComments();
    
  }, [postId]);

  
  async function getComments() {
    try {
      const {numComments, comments} = await AutobloggerApi.getComments(postId);
      setComments(comments);
      setNumComments(numComments);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  }

  if(isLoading) return ("LOADING...")

  return (
    <>
      {error && <Box>Something messed up: {error}</Box>}
      
      {numComments} {numComments >1 ? "Comments": "Comment"}

      <Stack id='comments' sx={{backgroundColor:grey[200]}}>

      {comments.map(({commentId, body, username, createdAt}) => (
      <Grid key={commentId} >
        <CommentCard 
        commentId={commentId} 
        body={body} 
        username={username} 
        createdAt={createdAt}/>
        </Grid>)) }
        </Stack>


    </>
  );
};

export default CommentList;
