import { Container, Typography } from "@mui/material";

const NotFound = () => (
  <Container maxWidth="sm" sx={{ py: 8 }}>
    <Typography variant="h2" component="h1">
      Oh snap! That page doesn&apos;t exist
    </Typography>
  </Container>
);

export default NotFound;
