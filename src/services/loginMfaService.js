// src/services/loginMfaService.js
import API from "./api";

// Verificar credenciales y determinar si se requiere MFA
export const verifyCredentials = async (email, password) => {
  try {
    const response = await API.post("/login-mfa/verify-credentials", {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al verificar credenciales";
  }
};

// Verificar OTP y completar login
export const verifyOtp = async (userId, otp) => {
  try {
    const response = await API.post("/login-mfa/verify-otp", {
      userId,
      otp
    });
    
    // Guardar datos del usuario en localStorage
    const { token, userId: id, email, role, fullName } = response.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("fullName", fullName);
    
    return response.data.user;
  } catch (error) {
    throw error.response?.data || "Error al verificar OTP";
  }
};