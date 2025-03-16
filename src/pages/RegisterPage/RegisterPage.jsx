import React from "react";
import { Box, Typography, Button, Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock, Person } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import "./RegisterPage.css";

const RegisterPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="register-container">
      <Box className="register-image" />
      <Box className="register-content">
        <img src={logo} alt="Logo" className="register-logo" />
        <Card sx={{ backgroundColor: "#D1FFEA" }} className="register-card">
          <CardContent>
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: isMobile ? 1.5 : 2 
            }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                className="register-title" 
                sx={{ fontWeight: 'bold' }}
              >
                Register
              </Typography>
              <CustomTextField label="Full Name" type="text" icon={<Person />} />
              <CustomTextField label="Email" type="email" icon={<Email />} />
              <CustomTextField label="Password" type="password" icon={<Lock />} />
              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-end",
                mt: isMobile ? 1 : 2
              }}>
                <Button 
                  variant="contained" 
                  fullWidth={isMobile}
                  sx={{ 
                    backgroundColor: "#FFB74D", 
                    color: "black",
                    py: isMobile ? 1 : 1.5
                  }}
                >
                  Register
                </Button>
              </Box>
              <Typography 
                variant="body2" 
                className="signup-text"
                sx={{ mt: isMobile ? 1 : 2 }}
              >
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