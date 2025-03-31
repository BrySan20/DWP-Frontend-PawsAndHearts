// src/pages/LoginPage/components/ModalOtpVerify/ModalOtpVerify.jsx
import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  TextField, 
  CircularProgress,
  Box,
  Alert
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { verifyOtp } from "../../../../services/loginMfaService";

const ModalOtpVerify = ({ open, onClose, userId, onSuccess, onError }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter the otp code");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const user = await verifyOtp(userId, otp);
      onSuccess(user);
    } catch (err) {
      setError(err.error || "Inválid OTP code");
      onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Two-step athentication verification
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
          <Box sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: "50%", mb: 2 }}>
            <LockIcon sx={{ fontSize: 50, color: "#FFB74D" }} />
          </Box>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Enter the verification code from Google Authenticator app
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2, width: "100%" }}>{error}</Alert>}
          
          <TextField
            label="Verification code"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Enter the six-digit code"
            inputProps={{ maxLength: 6 }}
          />
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: "center" }}>
            The code changes every 30 seconds
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "0 24px 20px", justifyContent: "center" }}>
        <Button 
          onClick={onClose} 
          sx={{ mr: 1 }}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleVerify}
          disabled={isLoading}
          sx={{ backgroundColor: "#FFB74D", color: "black" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalOtpVerify;