import API from "./api";

// Generar secreto MFA para registro
export const generateMFASecret = async (email, fullName, password) => {
  try {
    const response = await API.post("/mfa/generate-secret", { 
      email,
      fullName,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al generar secreto MFA";
  }
};

// Completar registro con MFA
export const completeMFARegistration = async (email, fullName, password, mfaSecret) => {
  try {
    const response = await API.post("/mfa/complete-registration", {
      email,
      fullName,
      password,
      mfaSecret // Ahora enviamos el secreto en la solicitud
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al completar registro con MFA";
  }
};

// Verificar OTP para login
export const verifyOTPLogin = async (email, password, otp) => {
  try {
    const response = await API.post("/mfa/verify-otp", {
      email,
      password,
      otp
    });
    
    // Guardar datos del usuario en localStorage como en el login normal
    const { token, userId, email: userEmail, role, fullName } = response.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("role", role);
    localStorage.setItem("fullName", fullName);
    
    return response.data.user;
  } catch (error) {
    throw error.response?.data || "Error al verificar OTP";
  }
};