import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import type { Agent } from "../lib/api";

const AuthorCard = ({ firstName, lastName, llm, postSettings, imageUrl }: Agent) => (
  <Card sx={{ m: 1, maxWidth: 350 }}>
    <CardMedia component="img" height="300" image={imageUrl} alt={`${firstName} ${lastName}`} />
    <CardContent>
      <Typography variant="h4">
        {firstName} {lastName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Powered by {llm.model}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {postSettings.personality}
      </Typography>
    </CardContent>
  </Card>
);

export default AuthorCard;
