import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, TextField,
  Typography, IconButton, Box, Snackbar, Alert, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Email, Sms, Lock } from '@mui/icons-material';
import { verifyEmail, sendResetCode, verifyResetCode, resetPassword } from '../../../../services/resetPassService';
import { validateEmail, validatePassword } from '../../../../utils/ValidationUtils';

const steps = ['Verify email', 'Verification code', 'New password'];

const ResetPasswordModal = ({ open, onClose }) => {
  // Estados para controlar el paso actual y los datos del formulario
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  // Función para manejar el envío del formulario en cada paso
  const handleNext = async () => {
    setError('');
    setLoading(true);

    try {
      if (activeStep === 0) {

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          setError(emailValidation.message);
          setLoading(false);
          return;
        }

        const result = await verifyEmail(email);
        if (result.exists) {
          await sendResetCode(email);
          setEmailVerified(true);
          setActiveStep(1);

          // Iniciar contador de 5 minutos
          setCountdown(300);
          const intervalId = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(intervalId);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          showSnackbar('Code sent to email', 'success');
        } else {
          setError('The email is not registered');
        }
      } else if (activeStep === 1) {
        // Verificar código
        if (code.length !== 6) {
          setError('The code must have six digits');
          setLoading(false);
          return;
        }

        const result = await verifyResetCode(email, code);

        if (result.success) {
          setCodeVerified(true);
          setActiveStep(2);
          showSnackbar('Code verified successfully', 'success');
        } else {
          setError('Incorrect or expired code');
        }
      } else if (activeStep === 2) {

        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          setLoading(false);
          return;
        }

        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await resetPassword(email, code, newPassword);

        if (result.success) {
          showSnackbar('Password reset successfully', 'success');
          setTimeout(() => {
            handleClose();
          }, 3000);
        } else {
          setError('Password reset error');
        }
      }
    } catch (err) {
      setError(err.error || 'An error has occurred');
    } finally {
      setLoading(false);
    }
  };

  // Función para mostrar mensajes en el Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Función para formatear el tiempo del contador
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Función para enviar el código nuevamente
  const handleResendCode = async () => {
    setLoading(true);
    try {
      await sendResetCode(email);
      setCountdown(300);
      const intervalId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      showSnackbar('Code successfully resent', 'success');
    } catch (err) {
      setError(err.error || 'Error resending code');
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar el modal y reiniciar el estado
  const handleClose = () => {
    setActiveStep(0);
    setEmail('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setEmailVerified(false);
    setCodeVerified(false);
    setCountdown(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Reset password
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3, mt: 1 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {activeStep === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">
              Enter your email to receive a reset code.
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'grey.500' }} />
              }}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">
              We've sent a verification code to your email.
              Enter the six digits code.
            </Typography>

            <TextField
              label="Verification code"
              type="text"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              inputProps={{ maxLength: 6 }}
              InputProps={{
                startAdornment: <Sms sx={{ mr: 1, color: 'grey.500' }} />
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Remaining time: {formatTime(countdown)}
              </Typography>

              <Button
                disabled={loading || countdown > 0}
                onClick={handleResendCode}
                size="small"
              >
                Reenviar código
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">
              Create a new password.
            </Typography>

            <TextField
              label="New password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: 'grey.500' }} />
              }}
            />

            <TextField
              label="Confirm password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: 'grey.500' }} />
              }}
              error={confirmPassword.length > 0 && newPassword !== confirmPassword}
              helperText={confirmPassword.length > 0 && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleNext} variant="contained" disabled={loading}>
          {activeStep === 2 ? 'Save' : 'Next'}
        </Button>

      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ResetPasswordModal;