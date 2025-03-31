import API from "./api";

// Solicitar código de reinicio OTP
export const requestResetCode = async (email) => {
  try {
    const response = await API.post("/reset-otp/request-code", { 
      email 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error al solicitar código de reinicio" };
  }
};

// Verificar código de reinicio
export const verifyResetCode = async (userId, code) => {
  try {
    const response = await API.post("/reset-otp/verify-code", {
      userId,
      code
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error al verificar código" };
  }
};

// Regenerar secreto OTP
export const regenerateOtpSecret = async (email) => {
  try {
    const response = await API.post("/reset-otp/regenerate-secret", {
      email
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error al regenerar secreto OTP" };
  }
};