import API from "./api";

export const getScheduledAdoptions = async () => {
  try {
    const response = await API.get("/adoptions/scheduled");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching scheduled adoptions";
  }
};

export const processAdoptionRequest = async (adoptionId, status) => {
  try {
    const response = await API.put(`/adoptions/process/${adoptionId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error processing adoption request";
  }
};