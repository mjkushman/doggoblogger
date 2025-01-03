import { Card, CardContent, Typography,CardMedia } from "@mui/material";


const AuthorCard = ({ firstName, lastName, personality, imageUrl }) => {

  return (
    <Card align="auto" sx={{m:1, maxWidth:'350px'}}>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt="Cleo the corgi"/>
      <CardContent>
        <Typography variant="h4">{firstName}{" "}{lastName}</Typography>
        <Typography variant="subtitle1" gutterBottom>Powered by ChatGPT</Typography>
        <Typography variant="body2" gutterBottom>{personality}</Typography>


      </CardContent>
    </Card>
  );
};

export default AuthorCard;
