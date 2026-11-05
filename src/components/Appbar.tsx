import { NavLink } from "react-router-dom";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";

const links = [
  { to: "/", label: "Home" },
  { to: "/authors", label: "Authors" },
  { to: "/about", label: "About" },
];

const Appbar = () => (
  <AppBar
    position="sticky"
    color="inherit"
    sx={{
      bgcolor: "rgba(250, 246, 240, 0.82)",
      backdropFilter: "blur(14px)",
      borderBottom: 1,
      borderColor: "divider",
      color: "text.primary",
    }}
  >
    <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
      <Toolbar disableGutters sx={{ gap: 2 }}>
        <Typography
          variant="h5"
          component={NavLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: "primary.dark",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" aria-hidden="true" sx={{ fontSize: "1.3em" }}>
            🐾
          </Box>
          Doggoblog
        </Typography>
        <Stack direction="row" spacing={0.5} component="nav" aria-label="Main">
          {links.map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              end
              color="inherit"
              size="small"
              sx={{
                px: { xs: 1.25, sm: 2 },
                color: "text.secondary",
                transition: "background-color 150ms, color 150ms",
                "&:hover": { bgcolor: "action.hover", color: "text.primary" },
                "&.active": { bgcolor: "primary.main", color: "primary.contrastText" },
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Appbar;
