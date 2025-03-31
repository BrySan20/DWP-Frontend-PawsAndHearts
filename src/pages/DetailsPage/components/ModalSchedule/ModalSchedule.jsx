import React, { useState } from "react";
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as adoptService from '../../../../services/adoptPetService';

const ModalSchedule = ({ open, handleClose, onAdoptionComplete }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleConfirmDate = async () => {
    try {
      // Get the selected pet from localStorage
      const selectedPetStr = localStorage.getItem('selectedPet');
      if (!selectedPetStr) {
        throw new Error("No pet selected");
      }
      const selectedPet = JSON.parse(selectedPetStr);

      // Schedule the adoption with the selected date
      await adoptService.scheduleAdoption(selectedPet, selectedDate.toISOString());

      // Show success message
      setSnackbarMessage("Adoption scheduled successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Call the callback to update parent component
      if (onAdoptionComplete) {
        onAdoptionComplete();
      }

      // Close the modal after a short delay
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error("Error scheduling adoption:", error);
      setSnackbarMessage(error.message || "Failed to schedule adoption");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="schedule-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="schedule-modal-title" variant="h6" gutterBottom sx={{ color: "black", mb: 4 }} >
            Schedule your adoption visit
          </Typography>
          <Typography variant="body2" sx={{ color: "red", mb: 4 }}>
            You can only process one adoption at a time. If you have any questions, please contact the administrator.
          </Typography>
          {/* Date and Time Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select date and time"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{ width: "100%", marginBottom: 2 }}
            />
          </LocalizationProvider>
          {/* Confirm Button */}
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            fullWidth
            onClick={handleConfirmDate}
          >
            Confirm date
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalSchedule;