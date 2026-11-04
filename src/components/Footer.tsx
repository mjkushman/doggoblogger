import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => (
  <Typography
    component="footer"
    variant="body2"
    color="text.secondary"
    align="center"
    sx={{ mt: 8, mb: 4 }}
  >
    {"Copyright © "}
    <Link color="inherit" component={RouterLink} to="/">
      Doggoblog
    </Link>{" "}
    {new Date().getFullYear()}.
  </Typography>
);

export default Footer;
