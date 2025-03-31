import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import { confirmAccountDeletion } from '../../../../services/userProfileService';
import { logout } from '../../../../services/authService';

const ProfileModal = ({ open, onClose, verificationCode }) => {
    const [inputCode, setInputCode] = useState('');

    const handleConfirmDeletion = async () => {
        try {
            await confirmAccountDeletion(verificationCode, inputCode);
            Swal.fire({
                title: 'Account Deleted',
                text: 'Your account has been successfully deleted',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                logout();
            });
        } catch (error) {
            Swal.fire('Error', error.message || 'Could not delete account', 'error');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Account Deletion Verification</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                   ℹ️ A verification code has been sent to your email. Please enter it below.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Verification Code"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmDeletion} color="error">
                    Confirm Deletion
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal;