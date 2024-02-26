import { createTheme } from "@mui/material";

// Use this website to help updating theme options 
// https://zenoo.github.io/mui-theme-creator/



const themeOptions = {
palette: {
  mode: 'light',
  primary: {
    main: '#738D98',
  },
  secondary: {
    main: '#ad4212',
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
overrides: {
  MuiAppBar: {
    colorInherit: {
      backgroundColor: '#689f38',
      color: '#fff',
    },
  },
},
};


const theme = createTheme(themeOptions)
export default theme
