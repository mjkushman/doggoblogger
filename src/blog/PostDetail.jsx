import {
  Avatar,
  Box,
  Typography,
  Stack,
  Link,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate, useParams } from "react-router-dom";
import AutobloggerApi from "../api";
import parse from "html-react-parser";
import CommentList from "../comments/CommentList";
import Loading from "../common/Loading";
import Hero from "./Hero";

// import './PostDetail.css'

/** A full blog post
 *  Includes the full text
 *  And a comments section
 */

const PostDetail = () => {
  // const date = dayjs(createdAt).format('DD-MMM-YY')
  const { postId } = useParams();
  const [post, setPost] = useState("loading");

  const [isLoading, setIsLoading] = useState(true);
  let [date, setDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function getPost() {
      try {
        let postRes = await AutobloggerApi.getPost(postId);
        console.log("POST RES", postRes);
        setPost(postRes);
        setDate((dayjs(postRes.createdAt).format('MMM DD, YYYY')))
      } catch (error) {
        console.log("error loading post:", error);
        navigate('/notfound',{replace:true})

      }
    }
    getPost();
    setIsLoading(false);
    // handle an invalid postId
  }, [postId]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Hero headline={post.titlePlaintext} />
      <Container maxWidth="md" >
        <Box maxWidth="md" sx={{ p: 4, t: 2}}>
          <Typography
            color="inherit"
            variant="h2"
            underline="none"
            gutterBottom
            >
            {post.titlePlaintext}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ p: 3 }}>
            <Avatar src={post.authorImageUrl} />
            <Typography sx={{ flexGlow: 1 }}> {post.username}</Typography>
            <Typography>{date}</Typography>
          </Stack>
          
          <Box  p={4}>{post.bodyHtml && parse(String(post.bodyHtml))} </Box>

          <CommentList postId={postId} />
        </Box>
      </Container>
    </>
  );
};

export default PostDetail;
