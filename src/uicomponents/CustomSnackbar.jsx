// src/uicomponents/CustomSnackbar.jsx
import React from "react";
import { Snackbar, Alert, Box } from "@mui/material";
import { CheckCircle, Error, Warning, Info } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

// Animation for success icon
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

// Animation for error icon
const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(3px);
  }
  75% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(0);
  }
`;

// Animation for warning icon
const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Animation for info icon
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const CustomSnackbar = ({ open, message, severity, onClose, autoHideDuration = 6000 }) => {
  const getIcon = () => {
    switch (severity) {
      case "success":
        return (
          <CheckCircle
            sx={{
              color: "white",
              mr: 1,
              animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            }}
          />
        );
      case "error":
        return (
          <Error
            sx={{
              color: "white",
              mr: 1,
              animation: `${shakeAnimation} 0.5s`,
            }}
          />
        );
      case "warning":
        return (
          <Warning
            sx={{
              color: "white",
              mr: 1,
              animation: `${bounceAnimation} 1s infinite ease-in-out`,
            }}
          />
        );
      case "info":
      default:
        return (
          <Info
            sx={{
              color: "white",
              mr: 1,
              animation: `${rotateAnimation} 1s ease-in-out`,
            }}
          />
        );
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        icon={false}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {getIcon()}
          {message}
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;