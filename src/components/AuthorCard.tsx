import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import type { Agent } from "../lib/api";

const AuthorCard = ({ firstName, lastName, llm, postSettings, imageUrl }: Agent) => (
  <Card sx={{ height: "100%", "&:hover": { transform: "translateY(-4px)", boxShadow: 6 } }}>
    <CardMedia
      component="img"
      image={imageUrl}
      alt={`${firstName} ${lastName}`}
      sx={{ aspectRatio: "4 / 3", objectFit: "cover" }}
    />
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h4" component="h2">
        {firstName} {lastName}
      </Typography>
      <Chip
        size="small"
        variant="outlined"
        color="primary"
        label={`Powered by ${llm.model}`}
        sx={{ mt: 1, mb: 2 }}
      />
      <Typography color="text.secondary">{postSettings.personality}</Typography>
    </CardContent>
  </Card>
);

export default AuthorCard;
