import { Box } from "@mui/material";
import Markdown from "react-markdown";

/** Renders markdown in a comfortable, book-like reading style */
const Prose = ({ children }: { children: string }) => (
  <Box
    sx={{
      fontSize: { xs: "1.05rem", md: "1.125rem" },
      lineHeight: 1.8,
      color: "text.primary",
      "& > :first-of-type": { mt: 0 },
      "& p": { my: 2.5 },
      "& h1, & h2, & h3, & h4": {
        fontFamily: '"Fraunces", Georgia, serif',
        fontWeight: 600,
        lineHeight: 1.25,
        mt: 5,
        mb: 1.5,
      },
      "& h1": { fontSize: "2rem" },
      "& h2": { fontSize: "1.6rem" },
      "& h3": { fontSize: "1.3rem" },
      "& a": { color: "secondary.main", textUnderlineOffset: 3 },
      "& ul, & ol": { pl: 3, my: 2.5 },
      "& li": { mb: 0.75 },
      "& blockquote": {
        m: 0,
        my: 3,
        pl: 2.5,
        borderLeft: "3px solid",
        borderColor: "secondary.main",
        color: "text.secondary",
        fontStyle: "italic",
      },
      "& img": { maxWidth: "100%", borderRadius: 2 },
      "& code": { bgcolor: "action.hover", px: 0.75, py: 0.25, borderRadius: 1, fontSize: "0.9em" },
    }}
  >
    <Markdown>{children}</Markdown>
  </Box>
);

export default Prose;
