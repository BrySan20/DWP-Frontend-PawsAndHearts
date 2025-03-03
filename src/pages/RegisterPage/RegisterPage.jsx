import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock, Person } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <Box className="register-container">
      <Box className="register-image" />
      <Box className="register-content">
        <img src={logo} alt="Logo" className="register-logo" />
        <Card sx={{ backgroundColor: "#D1FFEA" }} className="register-card">
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5" className="register-title" sx={{ fontWeight: 'bold' }}>
                Register
              </Typography>
              <CustomTextField label="Full Name" type="text" icon={<Person />} />
              <CustomTextField label="Email" type="email" icon={<Email />} />
              <CustomTextField label="Password" type="password" icon={<Lock />} />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" sx={{ backgroundColor: "#FFB74D", color: "black" }}>
                  Register
                </Button>
              </Box>
              <Typography variant="body2" className="signup-text">
                Already have an account?{" "}
                <Link to="/" className="signup-link">
                  Login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegisterPage;
