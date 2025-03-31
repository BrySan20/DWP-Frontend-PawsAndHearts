import API from "./api";

// Obtener todas las mascotas disponibles
export const getAllPets = async () => {
  try {
    const response = await API.get("/pets");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener las mascotas";
  }
};

// Obtener detalles de una mascota específica
export const getPetById = async (petId) => {
  try {
    const response = await API.get(`/pets/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener los detalles de la mascota";
  }
};

// Add a pet to favorites
export const addToFavorites = async (petId) => {
  try {
    const response = await API.post("/favorites", { petId });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al añadir a favoritos";
  }
};

// Remove a pet from favorites
export const removeFromFavorites = async (petId) => {
  try {
    const response = await API.delete("/favorites", { data: { petId } });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al eliminar de favoritos";
  }
};

// Check if a pet is in favorites
export const isPetInFavorites = async (petId) => {
  try {
    const response = await API.get(`/favorites/${petId}/check`);
    return response.data.isInFavorites;
  } catch (error) {
    throw error.response?.data || "Error al verificar favoritos";
  }
};