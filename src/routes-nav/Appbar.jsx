import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Box } from "@mui/material";

import './Appbar.css'

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" >
        <Toolbar className="Appbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Autoblogger
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/")} color="inherit">
              {" "}
              Home
            </Button>
            <Button onClick={() => navigate("/authors")} color="inherit">
              {" "}
              Authors
            </Button>
            <Button onClick={() => navigate("/login")} color="inherit">
              {" "}
              Login
            </Button>
            <Button onClick={() => navigate("/register")} color="inherit">
              {" "}
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
