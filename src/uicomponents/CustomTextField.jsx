import React from "react";
import { TextField, InputAdornment } from "@mui/material";

const CustomTextField = ({ label, type, icon }) => {
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
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
        },
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
      InputLabelProps={{
        style: {
          fontSize: "1.2rem",
        },
      }}
    />
  );
};

export default CustomTextField;
