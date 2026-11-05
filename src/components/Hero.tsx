import { Box, Container, Typography } from "@mui/material";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708994484/dog-blogger-header_in2vwu.jpg";

const SIZES = {
  sm: { height: "22vh", min: 180, variant: "h4" },
  md: { height: "38vh", min: 260, variant: "h3" },
  lg: { height: "58vh", min: 360, variant: "h2" },
} as const;

interface HeroProps {
  headline?: string;
  subtitle?: string;
  size?: keyof typeof SIZES;
  backgroundImage?: string | null;
}

const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());

const Hero = ({ headline, subtitle, size = "md", backgroundImage }: HeroProps) => {
  const { height, min, variant } = SIZES[size];
  return (
    <Box
      sx={{
        position: "relative",
        height,
        minHeight: min,
        maxHeight: 560,
        backgroundImage: `url(${backgroundImage ?? DEFAULT_IMAGE})`,
        backgroundColor: "primary.dark",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "common.white",
      }}
    >
      {/* Darkens the photo so the headline stays readable on any image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20, 30, 35, 0.35) 0%, rgba(20, 30, 35, 0.72) 100%)",
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          animation: "fade-up 0.6s ease-out both",
        }}
      >
        <Typography
          variant={variant}
          component="h1"
          sx={{ textWrap: "balance", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          {headline && titleCase(headline)}
        </Typography>
        {subtitle && (
          <Typography variant="h6" component="p" sx={{ fontWeight: 400, opacity: 0.92, maxWidth: 560 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Hero;
