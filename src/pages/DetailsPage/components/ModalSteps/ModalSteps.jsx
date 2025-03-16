import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";

const ModalSteps = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="steps-modal-title">
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
        <Typography id="steps-modal-title" variant="h6" gutterBottom sx={{ color: "blue" }}>
          Steps to adopt your pet
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          1. You need to download the adoption application and the pet profile, and fill them out with the requested data.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          2. You will also need your ID, proof of address, and proof of income.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          3. Bring the documents to our office to begin the adoption process.
        </Typography>
        <Typography variant="body2" sx={{ color: "red" }}>
          *If you are missing any documents, the adoption cannot be completed.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <Button variant="contained" color="primary" startIcon={<Download />} fullWidth>
            Download adoption application
          </Button>
          <Button variant="contained" color="secondary" startIcon={<Download />} fullWidth>
            Download pet profile
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSteps;
