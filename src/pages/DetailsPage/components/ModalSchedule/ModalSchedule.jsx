import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ModalSchedule = ({ open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
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

        {/* Selector de fecha y hora con MUI */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Select date and time"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{ width: "100%", marginBottom: 2 }}
          />
        </LocalizationProvider>

        {/* Botón de confirmar */}
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircle />}
          fullWidth
          onClick={() => alert(`Date selected: ${selectedDate.format("YYYY-MM-DD HH:mm")}`)}
        >
          Confirm date
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalSchedule;
