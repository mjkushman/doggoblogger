import { Box, Container, Typography } from "@mui/material";

function Response404() {
  return (
    <Container maxWidth="sm" height='100vh' sx={{display:'flex'}}>
      <Box height='100%' alignContent='center' alignItems='center ' justifyContent="center">
      <Typography variant="h2"> Oh snap! That page doesn&apos;t exist</Typography>
      </Box>
    </Container>
  );
}

export default Response404;
