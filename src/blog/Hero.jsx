import { Container, Typography } from "@mui/material"


const Hero = () => {
  return (
    <Container sx={{height:'50vh', display:'flex',alignItems:'center', justifyContent:'center'}}>
        <Typography variant="h1" sx={{textAlign:'center'}}>autoblogger</Typography>
        </Container>
  )
}

export default Hero