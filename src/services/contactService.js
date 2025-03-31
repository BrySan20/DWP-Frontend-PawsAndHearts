// DWP-Frontend-PawsAndHearts/src/services/contactService.js
import API from "./api";

export const sendEmail = async (to, subject, body) => {
  const from = localStorage.getItem('email');
  
  try {
    const response = await API.post("/contact/send-email", { 
      from,
      to, 
      subject, 
      body 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar el correo";
  }
};