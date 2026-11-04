import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import Appbar from "./Appbar";
import Footer from "./Footer";

const Layout = () => {
  const navigation = useNavigation();
  return (
    <>
      <Appbar />
      {navigation.state === "loading" && <LinearProgress />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default Layout;
