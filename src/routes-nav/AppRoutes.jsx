import { Routes, Route, Navigate } from "react-router-dom";
import Blog from "../blog/Blog";
import AuthorsList from "../authors/AuthorsList";
import PostDetail from "../blog/PostDetail";
import Signup from "../login-signup/Signup";
import Login from "../login-signup/Login";
import Response404 from "../common/Response404";
import About from "../about/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />

      <Route path="/authors" element={<AuthorsList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/:postId" element={<PostDetail />} />
      <Route path='notfound' element={<Response404 />}/>
      <Route path="/*" element={<Navigate to='/notfound' replace={true}/>} />
    </Routes>
  );
};

export default AppRoutes;
