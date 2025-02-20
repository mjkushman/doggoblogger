import PostList from "./PostList";
import Hero from "../common/Hero";
import { Container } from "@mui/material";

/** Home page
 * Should render list of blog posts
 *
 */
//Hero header component
// Post List component . This is the list which holds cards
const Blog = () => {
  return (
    <>
      <Hero headline={"Doggoblog"} size={"lg"} />
      <Container>
        <PostList />
      </Container>
    </>
  );
};

export default Blog;
