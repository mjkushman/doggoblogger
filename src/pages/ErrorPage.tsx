import { isRouteErrorResponse, useRevalidator, useRouteError } from "react-router-dom";
import { Alert, Button, Container, Typography } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();
  const revalidator = useRevalidator();
  const detail = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : undefined;

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center", animation: "fade-up 0.5s ease-out both" }}>
      <Typography sx={{ fontSize: "4rem" }} aria-hidden="true">
        🦴
      </Typography>
      <Typography variant="h3" component="h1" gutterBottom>
        We couldn&apos;t load this page
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The blog server may be offline or unreachable. Please try again in a moment.
      </Typography>
      {detail && (
        <Alert severity="warning" sx={{ mb: 3, justifyContent: "center" }}>
          {detail}
        </Alert>
      )}
      <Button
        variant="contained"
        onClick={() => revalidator.revalidate()}
        disabled={revalidator.state === "loading"}
      >
        Try again
      </Button>
    </Container>
  );
};

export default ErrorPage;
