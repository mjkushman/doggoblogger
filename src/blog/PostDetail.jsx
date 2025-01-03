import { Avatar, Box, Typography, Stack, Container } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import AutobloggerApi from "../api";
import parse from "html-react-parser";
import Loading from "../common/Loading";
import Hero from "../common/Hero";
import Markdown from "react-markdown";

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

  const navigate = useNavigate();

  // Retrieve the blog post
  useEffect(() => {
    async function getPost() {
      try {
        setIsLoading(true);
        let post = await AutobloggerApi.getPost(postId);
        // console.log("POST RES", postRes);
        if (post.postId !== postId) {
          console.log("thats not a page");
          navigate("/notfound", { replace: true });
        }
        setPost(post);

        setIsLoading(false);
      } catch (error) {
        console.log("error loading post:", error);
        navigate("/", { replace: true });
      }
    }
    getPost();
  }, [postId]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Hero headline={post.title} size="" backgroundImage={post.imageUrl} />
      <Container maxWidth="md">
        <Box maxWidth="md" sx={{ p: 4, t: 2 }}>
          <Stack direction="row" spacing={3} sx={{ p: 3 }}>
            <Avatar>{post.authorId.slice(0, 2)}</Avatar>
            <Typography sx={{ flexGlow: 1 }}> {post.username}</Typography>
            <Typography>
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </Typography>
          </Stack>

          <Box p={4}>
            <Markdown>{post.content}</Markdown>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PostDetail;
