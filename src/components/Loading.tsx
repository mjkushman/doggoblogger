import { CircularProgress, Box } from "@mui/material";

const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }} role="status" aria-label="Loading">
    <CircularProgress />
  </Box>
);

export default Loading;
