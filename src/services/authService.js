import API from "./api";

// Registro de usuario
export const register = async (email, fullName, password) => {
  try {
    const response = await API.post("/auth/register", { email, fullName, password });
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error en el registro";
  }
};

// Inicio de sesión
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    console.log("Login response:", response.data);

    const { token, userId, email: userEmail, role, fullName } = response.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("role", role);
    localStorage.setItem("fullName", fullName);

    return response.data.user;
  } catch (error) {
    throw error.response?.data || "Error en el login";
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener perfil";
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
