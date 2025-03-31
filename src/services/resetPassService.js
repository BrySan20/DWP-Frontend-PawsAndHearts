import API from "./api";

// Verificar si el correo existe en la base de datos
export const verifyEmail = async (email) => {
  try {
    const response = await API.post("/reset-password/verify-email", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al verificar el correo";
  }
};

// Enviar código de restablecimiento
export const sendResetCode = async (email) => {
  try {
    const response = await API.post("/reset-password/send-code", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar el código";
  }
};

// Verificar código de restablecimiento
export const verifyResetCode = async (email, code) => {
  try {
    const response = await API.post("/reset-password/verify-code", { email, code });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al verificar el código";
  }
};

// Restablecer contraseña
export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await API.post("/reset-password/reset-password", { 
      email, 
      code, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al restablecer la contraseña";
  }
};