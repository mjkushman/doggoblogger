import { Box, Container, Typography } from "@mui/material";

function Response404() {
  return (
    <Container maxWidth="sm" >
      <Box>
      <Typography variant="h2"> Oh snap! That page doesn't exist</Typography>
      </Box>
    </Container>
  );
}

export default Response404;
