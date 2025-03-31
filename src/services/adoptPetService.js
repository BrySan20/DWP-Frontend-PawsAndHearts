import API from "./api";

// Schedule an adoption
export const scheduleAdoption = async (pet, date) => {
  try {
    const response = await API.post("/adopt/schedule", { pet, date });
    return response.data.scheduledAdoption;
  } catch (error) {
    throw error.response?.data || "Error scheduling adoption";
  }
};

// Rest of the code remains the same
export const checkAdoptionEligibility = async (petId) => {
  try {
    const response = await API.get(`/adopt/eligibility/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error checking adoption eligibility";
  }
};

export const cancelScheduledAdoption = async () => {
  try {
    const response = await API.delete("/adopt/cancel");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error canceling scheduled adoption";
  }
};