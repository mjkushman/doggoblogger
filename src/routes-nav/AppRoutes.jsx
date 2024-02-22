import {Routes, Route} from "react-router-dom"
import Blog from "../blog/Blog"
import AuthorsList from "../authors/AuthorsList"
import PostDetail from "../blog/PostDetail"




const AppRoutes =() => {

    return (
        <Routes>
            Each route goes in here
            <Route path="/" element={<Blog/>}/>
            <Route path="/authors" element={<AuthorsList/>}/>
            <Route path="/:postId" element={<PostDetail/>}/>
        </Routes>
    )

}

export default AppRoutes