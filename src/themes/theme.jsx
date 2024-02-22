import { createTheme } from "@mui/material";

// Use this website to help updating theme options 
// https://zenoo.github.io/mui-theme-creator/



const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 2,
  },
};

const theme = createTheme(themeOptions)
export default theme

