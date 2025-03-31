import axios from "axios";

const API = axios.create({
  baseURL: "https://dwp-backend-pawsandhearts.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en cada petición
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y refrescar token si es necesario
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.response?.data?.expired) {
      localStorage.removeItem("token"); // Eliminar token si expiró
      window.location.href = "/"; // Redirigir a login
    }
    return Promise.reject(error);
  }
);

export default API;
