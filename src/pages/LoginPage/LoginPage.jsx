import React from "react";
import { Box, Typography, Button, Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const handleLogin = () => {
        navigate("/dashboard");
    };
    
    return (
        <Box className="login-container">
            <Box className="login-image" />
            <Box className="login-content">
                <img src={logo} alt="Logo" className="login-logo" />
                <Card sx={{ backgroundColor: "#D1FFEA" }} className="login-card">
                    <CardContent>
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: isMobile ? 2 : 3 
                        }}>
                            <Typography 
                                variant={isMobile ? "h6" : "h5"} 
                                className="login-title" 
                                sx={{ fontWeight: 'bold' }}
                            >
                                Login
                            </Typography>
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
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Typography 
                                variant="body2" 
                                className="signup-text"
                                sx={{ mt: isMobile ? 1 : 2 }}
                            >
                                Don't have an account?{" "}
                                <Link to="/register" className="signup-link">
                                    Sign up
                                </Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default LoginPage;