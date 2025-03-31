//DWP-DWP-Frontend-PawsAndHearts/src/uicomponents/CustomTextField.jsx
import React from "react";
import { TextField, InputAdornment, useMediaQuery, useTheme } from "@mui/material";

const CustomTextField = ({ label, type, icon, value, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "35px",
        height: "35px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "35px",
          height: "35px",
          minHeight: "35px",
          padding: "0 14px",
          fontSize: isMobile ? "0.8rem" : "1rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: isMobile ? "0.8rem" : "1rem",
          top: "-4px", // Ajusta la posición del label
        },
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        style: {
          height: "35px",
        },
      }}
      InputLabelProps={{
        shrink: true, // Evita que el label interfiera con el tamaño
      }}
    />
  );
};

export default CustomTextField;
