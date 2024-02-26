import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext, useState } from "react";

import AutobloggerApi from "../api";
import UserContext from "../common/UserContext";
import { Navigate } from "react-router-dom";

const Signup = () => {

  const { setToken, currentUser } = useContext(UserContext);
  const INITIAL_FORM_DATA = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errorMessage, setErrorMessage] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  // Submitting the form sets the userToken, which in turn tells us what we know about the user.
  const submitForm = async () => {
    try {
      const res = await AutobloggerApi.registerUser(formData);
      console.log("RES FROM FORM SUBMIT", res);
      setToken(res);

    } catch (error) {
      console.log(error)
        setErrorMessage(() => error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(formData);
    setFormData(() => INITIAL_FORM_DATA);

  };

  return (
    <Container maxWidth="xs">
      {currentUser &&  <Navigate to='/' replace={true}/>}
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
            {errorMessage && <Alert severity={'error'}>{errorMessage}</Alert>}
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                value={formData.username}
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12}>
              <Typography>This checkbox does nothing.</Typography>
              <FormControlLabel
                control={<Checkbox value="doesNothingCheck" color="primary" />}
                label="But how can I be sure?"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            margin="auto"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/login" variant="body2">
                Already have an account? Sign in.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
