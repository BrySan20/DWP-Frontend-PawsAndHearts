import API from "./api";

// Obtener mascotas favoritas del usuario
export const getUserFavorites = async () => {
  try {
    const response = await API.get("/user-favorites/my-favorites");
    return response.data;
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    throw error.response?.data || "Error al obtener favoritos";
  }
};