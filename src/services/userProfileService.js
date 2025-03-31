import API from "./api";

export const getProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching profile";
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put("/profile/update", profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating profile";
  }
};

export const initiateAccountDeletion = async () => {
  try {
    const response = await API.post("/profile/delete/initiate");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error initiating account deletion";
  }
};

export const confirmAccountDeletion = async (verificationCode, inputCode) => {
  try {
    const response = await API.post("/profile/delete/confirm", { 
      verificationCode, 
      inputCode 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error confirming account deletion";
  }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const response = await API.put("/profile/update-password", {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating password";
  }
};