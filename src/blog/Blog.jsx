import React from 'react'
import PostList from './PostList'
import Hero from '../common/Hero'
import { Container } from '@mui/material'


/** Home page 
 * Should render list of blog posts
 * 
*/
//Hero header component
// Post List component . This is the list which holds cards
const Blog = () => {
  return (
    <>
    <Hero headline={"autoblogger"} size={"lg"}/>
    <Container>
    <PostList />
    </Container>
    </>
  )
}

export default Blog