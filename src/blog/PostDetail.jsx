import { Avatar, Box, Typography, Stack, Link, Button } from '@mui/material'
import {useEffect, useState, useContext} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useParams } from 'react-router-dom'
import AutobloggerApi from '../api'
import parse from 'html-react-parser'
import CommentList from '../comments/CommentList'

/** A full blog post
 *  Includes the full text
 *  And a comments section
 */

const PostDetail = () => {
  // const date = dayjs(createdAt).format('DD-MMM-YY')
  const {postId} = useParams()
  const [post, setPost] = useState('loading')
  const [ postUser, setPostUser ] = useState(null)

    useEffect( () => {
      async function getPost() {
       let postRes = await AutobloggerApi.getPost(postId)
       setPost(postRes)
       console.log(post)
       let userRes = await AutobloggerApi.getUserById(postRes.userId)
       setPostUser(userRes)
       
       console.log(postUser)

      } 
      // async function getUser(){

      // }

      // getUser()
      getPost()

    },[postId])
    



    return (
    <Box sx={{p:4, t:2,maxWidth:600}}>
      <Typography color='inherit' variant='h6' underline="none" gutterBottom>{post.titlePlaintext}</Typography>
      <Stack direction="row" spacing={3} sx={{p:3}} >
        
        <Avatar src="cleo-500.png"/>
        <Typography sx={ {flexGlow: 1 }}> username here</Typography>
        <Typography>data will go here</Typography>
        </Stack>
        <Box p={4}>{post.bodyHtml && parse(String(post.bodyHtml))} </Box>
      
  
        
        <CommentList postId={postId}/>



      </Box>
  )
}

export default PostDetail