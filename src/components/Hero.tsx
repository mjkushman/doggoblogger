import { Box, Typography } from "@mui/material";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708994484/dog-blogger-header_in2vwu.jpg";

const HEIGHTS = { sm: "20vh", md: "35vh", lg: "50vh" } as const;

interface HeroProps {
  headline?: string;
  size?: keyof typeof HEIGHTS;
  backgroundImage?: string | null;
}

const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const Hero = ({ headline, size = "md", backgroundImage }: HeroProps) => (
  <Box
    sx={{
      height: HEIGHTS[size],
      maxHeight: 500,
      backgroundImage: `url(${backgroundImage ?? DEFAULT_IMAGE})`,
      backgroundColor: "grey.600",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "common.white",
        backdropFilter: "blur(3px) brightness(80%)",
      }}
    >
      <Typography variant={size === "sm" ? "h5" : "h4"} component="h1" align="center">
        {headline && titleCase(headline)}
      </Typography>
    </Box>
  </Box>
);

export default Hero;
