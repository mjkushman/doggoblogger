import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";

const links = [
  { to: "/", label: "Home" },
  { to: "/authors", label: "Authors" },
  { to: "/about", label: "About" },
];

const Appbar = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography
        variant="h6"
        component={NavLink}
        to="/"
        sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
      >
        Doggoblog
      </Typography>
      <Stack direction="row" spacing={1} component="nav">
        {links.map(({ to, label }) => (
          <Button
            key={to}
            component={NavLink}
            to={to}
            end
            color="inherit"
            sx={{ "&.active": { textDecoration: "underline" } }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Toolbar>
  </AppBar>
);

export default Appbar;
