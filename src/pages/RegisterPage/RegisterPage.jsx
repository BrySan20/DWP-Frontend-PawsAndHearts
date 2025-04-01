//DWP-Frontend-PawsAndHearts/src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import CustomTextField from "../../uicomponents/CustomTextField";
import { Email, Lock, Person, VpnKey } from "@mui/icons-material";
import { generateMFASecret, completeMFARegistration } from "../../services/mfaService";
import ModalQrRegister from "../../pages/RegisterPage/components/QRVerificationModal/ModalQrRegister";
import { validateForm } from "../../utils/ValidationUtils";
import { showErrorMessage, showSuccessMessage, showLoadingMessage, closeAlert } from "../../uicomponents/alertMessages";
import logo from "../../assets/images/logo.png";
import "./RegisterPage.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Estados para manejar el modal y el código QR
    const [modalOpen, setModalOpen] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [mfaSecret, setMfaSecret] = useState(""); // Almacenar el secreto MFA
    const [isLoading, setIsLoading] = useState(false);

    // Función para validar campos antes de submit
    const validateFields = () => {
        const validation = validateForm({ email, password, fullName });
        if (!validation.isValid) {
            setError(validation.message);
            showErrorMessage("Validation error", validation.message);
            return false;
        }
        return true;
    };

    // Evento para prevenir espacios en campos de email y password
    const handleInputChange = (e, setter) => {
        const { value, name } = e.target;

        // Solo para email y password, eliminamos espacios al inicio
        if (name === 'email' || name === 'password') {
            setter(value.trimStart());
        } else {
            // Para el nombre completo permitimos espacios
            setter(value);
        }
    };

    // Función para iniciar el proceso de registro
    const handleRegisterStart = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            // Mostrar mensaje de carga
            showLoadingMessage("Generating QR code for authentication...");

            // Generar secreto MFA y obtener URL del QR
            const mfaData = await generateMFASecret(email, fullName, password);

            closeAlert();

            setQrCodeUrl(mfaData.qrCodeUrl);
            setMfaSecret(mfaData.secret); // Guardar el secreto MFA
            setModalOpen(true);
        } catch (err) {
            closeAlert();
            const errorMsg = err.error || "Error generating QR code";
            setError(errorMsg);
            showErrorMessage("Register error", errorMsg);
            console.error("MFA error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para completar el registro con MFA
    const handleCompleteRegistration = async () => {
        try {
            setIsLoading(true);

            showLoadingMessage("Completing registration...");

            await completeMFARegistration(email, fullName, password, mfaSecret);

            closeAlert();

            setModalOpen(false);
            setSuccess("Successfully registered with two-factor authentication!");

            showSuccessMessage("¡Successfully registered!", "Successfully registered. You will be redirected to Login page.");

            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            closeAlert();
            const errorMsg = err.error || "Error completing registration";
            setError(errorMsg);
            showErrorMessage("Register error", errorMsg);
            console.error("Registration completion error:", err);
            setModalOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cerrar el modal y cancelar el registro
    const handleCloseModal = () => {
        setModalOpen(false);
        setQrCodeUrl("");
        setMfaSecret("");
    };

    return (
        <Box className="register-container">
            <Box className="register-image" />
            <Box className="register-content">
                <img src={logo} alt="Logo" className="register-logo" />
                <Card sx={{
                    backgroundColor: "#D1FFEA",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column"
                }} className="register-card">
                    <CardContent>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: isMobile ? 1 : 1.5,
                            width: "100%"
                        }}>
                            <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
                                Register
                            </Typography>

                            <CustomTextField
                                label="Full Name"
                                type="text"
                                name="fullName"
                                icon={<Person />}
                                value={fullName}
                                onChange={(e) => handleInputChange(e, setFullName)}
                            />
                            <CustomTextField
                                label="Email"
                                type="email"
                                name="email"
                                icon={<Email />}
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                            />
                            <CustomTextField
                                label="Password"
                                type="password"
                                name="password"
                                icon={<Lock />}
                                value={password}
                                onChange={(e) => handleInputChange(e, setPassword)}
                            />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: isMobile ? 1 : 2,
                                width: "100%"
                            }}>
                                <Button
                                    variant="contained"
                                    fullWidth={isMobile}
                                    sx={{
                                        backgroundColor: "#FFB74D",
                                        color: "black",
                                        py: isMobile ? 0.5 : 1,
                                        minHeight: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={handleRegisterStart}
                                    disabled={isLoading}
                                    startIcon={!isLoading && <VpnKey />}
                                >
                                    {isLoading ? (
                                        <>
                                            <ClockLoader size={16} color="#000000" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                            </Box>

                            <Typography variant="body2" sx={{ mt: isMobile ? 1 : 1.5, textAlign: "center", width: "100%" }}>
                                Already have an account?{" "}
                                <Link to="/" className="signup-link">Login</Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Modal para QR code */}
            <ModalQrRegister
                open={modalOpen}
                onClose={handleCloseModal}
                qrCodeUrl={qrCodeUrl}
                onConfirm={handleCompleteRegistration}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default RegisterPage;