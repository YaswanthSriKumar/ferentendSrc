
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import './login.css';
import ApiService from "../services/ApiService"
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    

    
      try {
        const responce= await ApiService.post(`/login/leela123/@leela123`);
        console.log(responce);
        
        if (!responce || responce.status !== 200) { 
          throw new Error("not 200");
      }
      localStorage.setItem("authToken", responce.data);
      console.log("Token stored successfully!");
      navigate("/customerDashbord")

  } catch (error) {
      // Extracting an error message properly
      setError(error.response?.data?.message || "invalied username or password");
      console.log("Unable to fetch:", error);

  } finally {
      setLoading(false);
    }
  
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box className="login-box">
        <Typography variant="h4" component="h1" gutterBottom sx={{ color:"#6A45F4"}}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#6A45F4"
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#6A45F4"
                  }
                }
              }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#6A45F4"
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#6A45F4"
                  }
                }
              }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 , bgcolor:"#6A45F4" }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
