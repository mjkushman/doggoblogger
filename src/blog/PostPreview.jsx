import { Avatar, Box, Typography, Stack, Button, Link } from '@mui/material'
import {useEffect, useState, useContext} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate  } from 'react-router-dom'
import AutobloggerApi from '../api'


const PostPreview = ({postId,titlePlaintext, username, bodyPlaintext, createdAt, numComments}) => {
    const date = dayjs(createdAt).format('DD-MMM-YY')
    const navigate = useNavigate()
    let preview = ''
    if(bodyPlaintext){
      const bodyArray = Array.from(bodyPlaintext).slice(0,300)
      preview = bodyArray.join('')      
    }
    
    const [author, setAuthor] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect( ()=> {
      setIsLoading(true)
      // defines function to retrieve author of a post
      async function getAuthor(){
        const author = await AutobloggerApi.getUserByUsername(username)
        setAuthor(author)
        setIsLoading(false)
      }

      getAuthor()
    }, [username])
    
    
    return (
    <Box sx={{p:4, t:2,maxWidth:700}}>
      <Link color='inherit' variant='h4' underline="none" href={postId}>{titlePlaintext}</Link>
      <Stack direction="row" spacing={3} sx={{p:3}} >
      
        <Avatar src="cleo-500.png"/>
        <Typography sx={ {flexGlow: 1 }} > {username}</Typography>
        <Typography>{date}</Typography>
        </Stack>

        <Box p={4}>{preview}{<Link href={postId} color='inherit' underline='none'>  ...read more</Link>}</Box>
        <Stack direction="row" spacing={3} sx={{p:3}} >
          <Button color='inherit' href={`${postId}#comments`}>{numComments} Comments</Button>

        </Stack>



      </Box>
  )
}

export default PostPreview