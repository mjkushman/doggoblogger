import { Container, Typography } from "@mui/material";

const Hero = ({ headline, size }) => {
  let height = "20vh";
  if (size == "large") {
    height = "50vh";
  }

  return (
    <Container
      sx={{
        height: { height },
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight:'500px'
      }}
    >
      <Typography variant="h2" element='h1' sx={{ textAlign: "center" }}>
        {headline}
      </Typography>
    </Container>
  );
};

export default Hero;
