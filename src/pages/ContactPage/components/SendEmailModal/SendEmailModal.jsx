import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, Alert 
} from '@mui/material';
import { sendEmail } from '../../../../services/contactService';

const SendEmailModal = ({ open, onClose }) => {
  const userEmail = localStorage.getItem('email');
  const [recipient, setRecipient] = useState('pawsandheartsdwp@gmail.com');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSendEmail = async () => {
    try {
      // Validaciones
      if (!recipient || !subject || !body) {
        throw new Error('All the fields are necessary');
      }

      await sendEmail(recipient, subject, body);
      
      setSnackbarMessage('Mail sent successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      setSnackbarMessage(error.message || 'Error sending email');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Send an Email</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Sender"
            type="email"
            fullWidth
            variant="outlined"
            value={userEmail}
            disabled
          />
          <TextField
            margin="dense"
            label="Receiver"
            type="email"
            fullWidth
            variant="outlined"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled
          />
          <TextField
            margin="dense"
            label="Subject"
            type="text"
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Body"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSendEmail} color="primary" variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

export default SendEmailModal;