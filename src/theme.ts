import { createTheme } from "@mui/material/styles";

// Theme playground: https://zenoo.github.io/mui-theme-creator/
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#738D98" },
    secondary: { main: "#ad4212" },
  },
  spacing: 8,
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiLink: { defaultProps: { underline: "hover" } },
    MuiAppBar: { defaultProps: { color: "primary", elevation: 0 } },
  },
});

export default theme;
