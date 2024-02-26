import { useState, useContext } from "react";
import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Link,
  Avatar,
  Typography,
} from "@mui/material";
import UserContext from "../common/UserContext";

const NewCommentForm = ({ addComment }) => {
  const { currentUser } = useContext(UserContext);
  const INITIAL_FORM_DATA = {
    message: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("handling form submit");
    e.preventDefault();
    addComment(currentUser.userId, formData.message);
  };

  return (
    <>
      {currentUser && (
        <Typography variant="body1">
          Commenting as {currentUser.username}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="message"
              required
              fullWidth
              multiline={true}
              rows="3"
              autoComplete="message"
              id="message"
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          //   fullWidth
          variant="outlined"
          margin="auto"
          sx={{ mt: 3, mb: 2 }}
          disabled={!currentUser}
        >
          Add Comment
        </Button>
        {!currentUser && (
          <Grid container justifyContent="flex">
            <Grid>
              <Link href="/login" variant="body2">
                Sign in to leave a comment.
              </Link>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default NewCommentForm;
