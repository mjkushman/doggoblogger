import { CircularProgress, Box } from "@mui/material";

const Loading = () => (
  <Box
    sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
    role="status"
    aria-label="Loading"
  >
    <CircularProgress color="primary" />
  </Box>
);

export default Loading;
