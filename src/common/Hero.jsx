import { Box, Container, Typography } from "@mui/material";

const Hero = ({ headline, size, backgroundImage }) => {
  if (backgroundImage == null) {
    backgroundImage =
      "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708994484/dog-blogger-header_in2vwu.jpg";
  }

  let height = "35vh";
  let variant = "h4";
  if (size == "lg") {
    height = "50vh";
  }
  if (size == "sm") {
    height = "20vh";
    variant = "h5";
  }

  return (
    <Container
      px={0}
      mx={0}
      sx={{
        height: { height },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "500px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "darkgray",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        p={0}
        m={0}
        sx={{
          backdropFilter: "blur(3px) brightness(80%)",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          color: "white",
          margin: "0px",
          padding: "0px",
        }}
      >
        <Typography variant={variant} element="h1" sx={{ textAlign: "center" }}>
          {headline &&
            headline.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
        </Typography>
      </Box>
    </Container>
  );
};

export default Hero;
