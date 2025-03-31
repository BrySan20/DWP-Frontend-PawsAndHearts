import API from "./api";

// Fetch completed adoptions
export const getCompletedAdoptions = async () => {
  try {
    const response = await API.get("/completed-adoptions");
    return response.data;
  } catch (error) {
    console.error("Error fetching completed adoptions:", error);
    throw error.response?.data || "Error fetching completed adoptions";
  }
};