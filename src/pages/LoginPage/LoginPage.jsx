import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();

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
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <Typography variant="h5" className="login-title" sx={{ fontWeight: 'bold' }}>
                                Login
                            </Typography>
                            <CustomTextField label="Email" type="email" icon={<Email />} />
                            <CustomTextField label="Password" type="password" icon={<Lock />} />
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" sx={{ backgroundColor: "#FFB74D", color: "black" }} onClick={handleLogin}>
                                    Login
                                </Button>
                            </Box>
                            <Typography variant="body2" className="signup-text">
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
