import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step,
  StepLabel, Typography, TextField, Box, CircularProgress, Alert
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { requestResetCode, verifyResetCode, regenerateOtpSecret } from '../../../../services/resetOtpService';
import { validateEmail, validatePassword } from '../../../../utils/ValidationUtils';

const ModalResetOtp = ({ open, onClose }) => {
  // Estados para el stepper
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [otpSecret, setOtpSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const steps = ['Request code', 'Verify code', 'Scann new QR'];

  // Reiniciar el modal al cerrarlo
  const handleClose = () => {
    setActiveStep(0);
    setEmail('');
    setUserId('');
    setVerificationCode('');
    setQrCodeUrl('');
    setOtpSecret('');
    setError('');
    setSuccess('');
    setConfirmed(false);
    onClose();
  };

  // Solicitar código de reinicio
  const handleRequestCode = async () => {

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    if (!email) {
      setError('Enter your email');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const result = await requestResetCode(email);
      setUserId(result.userId);
      setSuccess('Verification code sent to your email');
      setActiveStep(1);
    } catch (err) {
      setError(err.error || 'Error requesting code');
      console.error('Error soliciting reset code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar código
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Enter the verification code');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const result = await verifyResetCode(userId, verificationCode);

      // Si la verificación es exitosa, regenerar secreto OTP
      const secretData = await regenerateOtpSecret(result.email);
      setQrCodeUrl(secretData.qrCodeUrl);
      setOtpSecret(secretData.secret);

      setSuccess('Code verified successfully');
      setActiveStep(2);
    } catch (err) {
      setError(err.error || 'Incorrect verification code');
      console.error('Error verifying code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirmar configuración OTP
  const handleConfirmSetup = () => {
    if (!confirmed) {
      setError('Confirm that you have scanned the QR code');
      return;
    }

    setSuccess('Your two-factor authentication has been successfully reset');
    setTimeout(handleClose, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Reset two-factor authentication</DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {activeStep === 0 && (
          <Box>
            <Typography variant="body1" gutterBottom>
              Enter your email to receive a verification code:
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="body1" gutterBottom>
              Enter the verification code sent to your email:
            </Typography>
            <TextField
              label="Verification code"
              fullWidth
              margin="normal"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body1" gutterBottom>
              Scan this QR code with your Google authenticator app:
            </Typography>

            <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1, my: 2 }}>
              {qrCodeUrl && <QRCodeSVG value={qrCodeUrl} size={200} />}
            </Box>

            <Typography variant="body2" gutterBottom>
              If you can't change the code, enter this code manually into your app:
            </Typography>

            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold', mb: 2 }}>
              {otpSecret}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="confirmScan"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="confirmScan">I have scanned the QR code</label>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>

        {activeStep === 0 && (
          <Button
            onClick={handleRequestCode}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Request code'}
          </Button>
        )}

        {activeStep === 1 && (
          <Button
            onClick={handleVerifyCode}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Verify code'}
          </Button>
        )}

        {activeStep === 2 && (
          <Button
            onClick={handleConfirmSetup}
            variant="contained"
            color="primary"
            disabled={!confirmed}
          >
            Finish
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalResetOtp;