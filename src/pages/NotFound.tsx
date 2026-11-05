import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const NotFound = () => (
  <Container maxWidth="sm" sx={{ py: 12, textAlign: "center", animation: "fade-up 0.5s ease-out both" }}>
    <Typography sx={{ fontSize: "4rem" }} aria-hidden="true">
      🐕‍🦺
    </Typography>
    <Typography variant="h3" component="h1" gutterBottom>
      That page ran off
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 4 }}>
      We sniffed around but couldn&apos;t find what you were looking for.
    </Typography>
    <Button component={RouterLink} to="/" variant="contained">
      Back to the blog
    </Button>
  </Container>
);

export default NotFound;
