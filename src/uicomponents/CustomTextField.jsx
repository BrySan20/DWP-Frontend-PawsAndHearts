import React from "react";
import { TextField, InputAdornment, useMediaQuery, useTheme } from "@mui/material";

const CustomTextField = ({ label, type, icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Menos de 600px

  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "30px",
        fontSize: isMobile ? "0.8rem" : "1rem",
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
          padding: isMobile ? "10px" : "14px",
          fontSize: isMobile ? "0.9rem" : "1.2rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: isMobile ? "1rem" : "1.2rem",
        },
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        style: {
          height: isMobile ? "40px" : "50px", // Ajusta la altura en móviles
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: isMobile ? "1rem" : "1.2rem",
        },
      }}
    />
  );
};

export default CustomTextField;
