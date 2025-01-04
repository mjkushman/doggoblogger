import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Box, Link} from "@mui/material";
import AutobloggerApi from "../api";

import './Appbar.css'
import { useContext } from "react";
import UserContext from "../common/UserContext";

const Appbar = () => {
  const navigate = useNavigate();
  const {currentUser, token, setToken, LOCAL_STORAGE_KEY } = useContext(UserContext)
  
  function logout(){
    AutobloggerApi.token = null
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setToken(() =>  null)
    navigate('/')
  }
  
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" >
        <Toolbar className="Appbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/' variant="button" color='inherit' underline="none">
            Doggoblog
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/")} color="inherit" >
              {" "}
              Home
            </Button>
            <Button onClick={() => navigate("/authors")} color="inherit">
              {" "}
              Authors
            </Button>
            <Button onClick={() => navigate("/about")} color="inherit">
              {" "}
              About
            </Button>
            
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
