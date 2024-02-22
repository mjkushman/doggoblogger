import React from 'react'
import PostList from './PostList'
import Hero from './Hero'
import { Container } from '@mui/material'


/** Home page 
 * Should render list of blog posts
 * 
*/
//Hero header component
// Post List component . This is the list which holds cards
const Blog = () => {
  return (
    <Container>
      <Hero/>
    <div>Blog Section</div>
    
    <PostList />
    </Container>
  )
}

export default Blog