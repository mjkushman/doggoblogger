import { Card, CardContent, Typography,CardMedia } from "@mui/material";


const AuthorCard = ({ username, firstName, lastName, authorBio, imageUrl }) => {

  return (
    <Card align="auto" sx={{m:1, maxWidth:'350px'}}>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt="Cleo the corgi"/>
      <CardContent>
        <Typography variant="h4">{firstName}</Typography>
        <Typography variant="subtitle1" gutterBottom>@{username}</Typography>
        <Typography variant="body2" gutterBottom>{authorBio}</Typography>


      </CardContent>
    </Card>
  );
};

export default AuthorCard;
