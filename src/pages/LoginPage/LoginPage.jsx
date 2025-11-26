//DWP-Frontend-PawsAndHearts/src/pages/LoginPage/LoginPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock, VpnKey } from "@mui/icons-material";
import { login } from "../../services/authService";
import { verifyCredentials } from "../../services/loginMfaService";
import ModalOtpVerify from "./components/ModalOtpVerify/ModalOtpVerify";
import ModalResetOtp from "./components/ModalResetOtp/ModalResetOtp";
import ResetPasswordModal from "./components/ResetPasswordModal/ResetPasswordModal";
import logo from "../../assets/images/logo.png";
import { validateForm } from "../../utils/ValidationUtils";
import { showErrorMessage, showSuccessMessage, showLoadingMessage, closeAlert } from "../../uicomponents/alertMessages";
import "./LoginPage.css";

const getRedirectPath = (role) => {
    switch (role) {
        case 'admin':
            return '/admindashboard';
        case 'adopter':
            return '/dashboard';
        default:
            return '/dashboard';
    }
};

const LoginPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [resetOtpModalOpen, setResetOtpModalOpen] = useState(false);
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Estados para MFA
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState("");

    // Función para validar campos antes de submit
    const validateFields = () => {
        if (!email) {
            setError("Email is obligatory");
            showErrorMessage("Validation error", "Email is obligatory");
            return false;
        }
        return true;
    };

    // Manejo del inicio de sesión
    const handleLogin = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            // Mostrar mensaje de carga
            showLoadingMessage("Logging in...");

            // Verificar credenciales y determinar si requiere MFA
            const result = await verifyCredentials(email, password);

            closeAlert();

            if (result.hasMfa) {
                // Si tiene MFA, abrir modal para OTP
                setUserId(result.userId);
                setModalOpen(true);
            } else {
                // Login normal sin MFA
                const user = await login(email, password);
                showSuccessMessage("Welcome!", "You Have successfully Logged in");
                const userRole = user?.role;
                const redirectPath = getRedirectPath(userRole);
                navigate(redirectPath);
            }
        } catch (err) {
            closeAlert();
            const errorMsg = err.error || "Incorrect credentials";
            setError(errorMsg);
            showErrorMessage("Login error", errorMsg);
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar el éxito de la verificación OTP
    const handleOtpSuccess = (user) => {
        setModalOpen(false);
        showSuccessMessage("Welcome!", "Successful OTP verification");
        const userRole = user?.role;
        const redirectPath = getRedirectPath(userRole);
        navigate(redirectPath);
    };

    // Función para manejar el error de la verificación OTP
    const handleOtpError = (err) => {
        console.error("OTP verification error:", err);
        // El error se maneja dentro del modal
    };

    // Evento para prevenir espacios en campos de email y password
    const handleInputChange = (e, setter) => {
        const { value } = e.target;
        setter(value.trimStart());
    };

    return (
        <Box className="login-container">
            <Box className="login-image" />
            <Box className="login-content">
                <img src={logo} alt="Logo" className="login-logo" />
                <Card sx={{
                    backgroundColor: "#D1FFEA",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column"
                }} className="login-card">
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 2 : 3 }}>
                            <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
                                Login V4 - AUTOMÁTICO
                            </Typography>

                            <CustomTextField
                                label="Email"
                                type="email"
                                icon={<Email />}
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                            />
                            <CustomTextField
                                label="Password"
                                type="password"
                                icon={<Lock />}
                                value={password}
                                onChange={(e) => handleInputChange(e, setPassword)}
                            />

                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: isMobile ? 1 : 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth={isMobile}
                                    sx={{
                                        backgroundColor: "#FFB74D",
                                        color: "black",
                                        py: isMobile ? 1 : 1.5,
                                        minHeight: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                    startIcon={!isLoading && <VpnKey />}
                                >
                                    {isLoading ? (
                                        <>
                                            <ClockLoader size={20} color="#000000" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                mt: isMobile ? 1 : 2
                            }} className="password-reset-options">
                                <Typography variant="body2" sx={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => setResetPasswordModalOpen(true)}>
                                    ¿Forgot your password?
                                </Typography>
                                <Typography variant="body2" sx={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => setResetOtpModalOpen(true)}>
                                    ¿Lost your OTP?
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ mt: isMobile ? 1 : 2, textAlign: "center" }}>
                                Don't have an account?{" "}
                                <Link to="/register" className="signup-link">Sign up</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Modal para verificación OTP */}
            <ModalOtpVerify
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                userId={userId}
                onSuccess={handleOtpSuccess}
                onError={handleOtpError}
            />

            <ModalResetOtp
                open={resetOtpModalOpen}
                onClose={() => setResetOtpModalOpen(false)}
            />
            <ResetPasswordModal
                open={resetPasswordModalOpen}
                onClose={() => setResetPasswordModalOpen(false)}
            />
        </Box>
    );
};

export default LoginPage;