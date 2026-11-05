import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => (
  <Box component="footer" sx={{ mt: 10, py: 5, borderTop: 1, borderColor: "divider" }}>
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        color="text.secondary"
      >
        <Typography variant="body2">
          © {new Date().getFullYear()}{" "}
          <Link color="inherit" component={RouterLink} to="/">
            Doggoblog
          </Link>
          . Written by dogs, with a little help from AI.
        </Typography>
        <Typography variant="body2">
          Powered by{" "}
          <Link
            href="https://autoblogger-client.onrender.com"
            target="_blank"
            rel="noopener"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            Autoblogger
          </Link>
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
