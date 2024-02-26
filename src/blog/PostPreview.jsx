import { Avatar, Box, Typography, Stack, Button, Link } from '@mui/material'
import dayjs from 'dayjs'
import { lazy } from 'react'





const PostPreview = ({postId, titlePlaintext, username, bodyPlaintext, createdAt, numComments, authorImageUrl, slug}) => {
    const date = dayjs(createdAt).format('MMM DD, YYYY')

    let preview = ''
    if(bodyPlaintext){
      const bodyArray = Array.from(bodyPlaintext).slice(0,300)
      preview = bodyArray.join('')      
    }
    
    
    return (
    <Box sx={{p:4, t:2,maxWidth:700}}>
      <Link color='inherit' variant='h4' underline="none" href={postId}>{titlePlaintext}</Link>
      <Stack direction="row" spacing={3} sx={{p:3}} >
      
        <Avatar src={authorImageUrl}/>
        <Typography sx={ {flexGlow: 1 }} > {username}</Typography>
        <Typography>{date}</Typography>
        </Stack>

        <Box p={4}>{preview}{<Link href={postId} color='inherit' underline='none'>  ...read more</Link>}</Box>
        <Stack direction="row" spacing={3} sx={{p:3}} >
          <Button color='inherit' href={`${postId}#comments`}>{numComments} {numComments == 1 ? "Comment": "Comments"}</Button>

        </Stack>



      </Box>
  )
}

export default PostPreview