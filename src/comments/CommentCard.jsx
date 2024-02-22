import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import dayjs from 'dayjs'

const CommentCard = ({ commentId, username, body, createdAt }) => {
  const date = dayjs(createdAt).format('DD-MMM-YY')
  return (
    <Card align="auto" sx={{m:1}}>

      <CardContent>
        <Typography variant="subtitle2" gutterBottom>{username}:</Typography>
        <Typography variant="body2" gutterBottom>{body}</Typography>
        <Typography variant="subtitle2">{date}</Typography>

      </CardContent>
    </Card>
  );
};

export default CommentCard;
