import { Container } from '@mui/material'
import {useState, useEffect} from 'react'
import AutobloggerApi from '../api'
import AuthorCard from './AuthorCard'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

/** Authors list 
 * Should render list of Authors
 * Big cards of each author
 * 
 * Clicking a card shows an author detail page
 * Detail page shows a list of their posts
 * 
*/


const AuthorsList = () => {
  
  const [ authors, setAuthors ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  async function getAuthors() {
    let res = await AutobloggerApi.getAuthors()
    setAuthors(res)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getAuthors()
  }, [])

  if(isLoading) return "LOADING..."
  return (
      // Hero header component
      // List of authors
    <Container>
      <Grid container spacing={2}>
      {!isLoading && authors.map(({username, 
      firstName, 
      lastName, 
      authorBio, imageUrl}) => (
        <Grid key={username}>
        <AuthorCard 
        firstName={firstName} 
        lastName={lastName} 
        username={username} 
        authorBio={authorBio}
        imageUrl={imageUrl} />
        </Grid>))}
        </Grid>


    </Container>
  )
}

export default AuthorsList