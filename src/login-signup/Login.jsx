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




/**
 * 
 * @returns {function}
 */

const Login = () => {
const { setToken, currentUser } = useContext(UserContext);
  const INITIAL_FORM_DATA = {
    username: "",
    password: ""
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const [errorMessage, setErrorMessage] = useState('')
  // Submitting the form sets the userToken, which in turn tells us what we know about the user.
  const submitForm = async () => {
    try {
        const res = await AutobloggerApi.loginUser(formData);
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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
      <Typography component="h1" variant="h4">
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
          {errorMessage && <Alert severity={'error'}>{errorMessage}</Alert>}
            <TextField
              name="username"
              required
              fullWidth
              autoComplete="username"
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
            {/* <Typography>Pineapple belongs on pizza.</Typography> */}
            <FormControlLabel
              control={<Checkbox value="pineapplePizza" color="primary" />}
              label="Pineapple on pizza is amazing"
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
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid>
            <Link href="/signup" variant="body2">
              Don&apos;t have an account? Sign up.
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default Login