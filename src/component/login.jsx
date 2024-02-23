import React, { useState } from "react";
import { Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (email === "root" && password === "toor") {
      // Login successful, navigate to the Dashboard
      window.alert("ล๊อกอินสำเร็จ");
      navigate("/dashbord");
    } else {
      // Login failed, display an error message (optional)
      window.alert("ล๊อกอินล้มเหลว อีเมล,รหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h5" align="center" gutterBottom>
            เข้าสู่ระบบ
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleLogin}
              style={{ marginTop: "1rem" }}
            >
              เข้าสู่ระบบ
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
