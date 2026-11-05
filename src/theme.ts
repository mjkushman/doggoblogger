import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const serif = '"Fraunces", Georgia, "Times New Roman", serif';
const sans = 'Inter, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

// Theme playground: https://zenoo.github.io/mui-theme-creator/
let theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3E5C69", light: "#738D98", dark: "#2B424C", contrastText: "#fff" },
    secondary: { main: "#B5501A" },
    background: { default: "#FAF6F0", paper: "#FFFFFF" },
    text: { primary: "#232B2F", secondary: "#5B666B" },
    divider: "rgba(35, 43, 47, 0.1)",
  },
  spacing: 8,
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: sans,
    h1: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.02em" },
    h2: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 },
    h3: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2 },
    h4: { fontFamily: serif, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25 },
    h5: { fontFamily: serif, fontWeight: 600, lineHeight: 1.3 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiLink: { defaultProps: { underline: "hover" } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, paddingInline: 20 } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(35, 43, 47, 0.08)",
          transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    MuiPaginationItem: { styleOverrides: { root: { fontWeight: 500 } } },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
