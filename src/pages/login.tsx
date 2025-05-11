import { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { login } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string|undefined>(undefined);
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
  });

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password); // Authenticate user
      dispatch(login(user)); // Store user in Redux state
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Invalid email or password"); // Handle incorrect credentials
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Login to ShopMart
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Error</AlertTitle>{error}</Alert> :  null}
        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Signup Redirect */}
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button variant="text" color="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
      
    </Container>
  );
};

export default Login;
