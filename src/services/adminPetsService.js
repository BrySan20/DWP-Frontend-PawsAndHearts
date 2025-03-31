import API from "./api";

// Get all pets
export const getAllPets = async () => {
  try {
    const response = await API.get("/pets/admin");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener mascotas";
  }
};

// Get public pets (no authentication required)
export const getPublicPets = async () => {
  try {
    const response = await API.get("/pets/public");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener mascotas públicas";
  }
};

// Get a pet by ID
export const getPetById = async (petId) => {
  try {
    const response = await API.get(`/pets/admin/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener mascota";
  }
};

// Get public pet by ID (no authentication required)
export const getPublicPetById = async (petId) => {
  try {
    const response = await API.get(`/pets/public/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener mascota pública";
  }
};

// Create a new pet
export const createPet = async (petData) => {
  try {
    // Create FormData to handle file upload
    const formData = new FormData();
    
    // Add all text fields to FormData
    Object.keys(petData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, petData[key]);
      }
    });
    
    // Add photo file if exists
    if (petData.photo instanceof File) {
      formData.append('photo', petData.photo);
    }
    
    const response = await API.post("/pets/admin", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al crear mascota";
  }
};

// Update a pet
export const updatePet = async (petId, petData) => {
  try {
    // Create FormData to handle file upload
    const formData = new FormData();
    
    // Add all text fields to FormData
    Object.keys(petData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, petData[key]);
      }
    });
    
    // Add photo file if exists and is a File object
    if (petData.photo instanceof File) {
      formData.append('photo', petData.photo);
    }
    
    const response = await API.put(`/pets/admin/${petId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al actualizar mascota";
  }
};

// Delete a pet
export const deletePet = async (petId) => {
  try {
    const response = await API.delete(`/pets/admin/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al eliminar mascota";
  }
};