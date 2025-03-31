import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Edit, House, Delete, Save } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { 
  getProfile, 
  updateUserProfile, 
  updateUserPassword, 
  initiateAccountDeletion 
} from '../../../../services/userProfileService';
import ProfileModal from '../ProfileModal/ProfileModal';
import { validatePassword } from '../../../../utils/ValidationUtils';
import './Profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    currentPassword: '',
    newPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deletionVerificationCode, setDeletionVerificationCode] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setUserProfile(profile);
        setEditedProfile(prev => ({
          ...prev,
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || '',
          address: profile.address || ''
        }));
      } catch (error) {
        Swal.fire('Error', 'Could not fetch profile', 'error');
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Validar nueva contraseña antes de actualizar
      if (editedProfile.currentPassword && editedProfile.newPassword) {
        const passwordValidation = validatePassword(editedProfile.newPassword);
  
        if (!passwordValidation.isValid) {
          Swal.fire('Error', passwordValidation.message, 'error');
          return; // Detiene el proceso si la contraseña no es válida
        }
  
        await updateUserPassword(
          editedProfile.currentPassword, 
          editedProfile.newPassword
        );
  
        Swal.fire({
          title: 'Password Updated',
          text: 'Your password has been successfully changed',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
  
      // Actualizar datos del perfil
      const { currentPassword, newPassword, ...profileData } = editedProfile;
      const updatedProfile = await updateUserProfile(profileData);
      
      setUserProfile(updatedProfile);
      setIsEditing(false);
  
      Swal.fire({
        title: 'Changes Saved',
        text: 'Your profile has been updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Limpiar los campos de contraseña después de guardar
      setEditedProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: ''
      }));
    } catch (error) {
      Swal.fire('Error', error.message || 'Could not save profile', 'error');
    }
  };
  

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete your account? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete my account'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await initiateAccountDeletion();
          setDeletionVerificationCode(response.verificationCode);
          setOpenModal(true);
        } catch (error) {
          Swal.fire('Error', 'Could not initiate account deletion', 'error');
        }
      }
    });
  };

  return (
    <div className="profile-container">
      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: 'blue' }}>Your Full Name</Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>{userProfile.fullName}</Typography>
      </Box>
      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2, marginTop: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
          <Edit sx={{ marginRight: 1 }} /> Your Data
        </Typography>
        <TextField 
          name="email"
          label="Email" 
          value={editedProfile.email || ''} 
          onChange={handleInputChange}
          fullWidth 
          sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }}
          disabled
        />
        <Typography variant="h6" sx={{ color: 'gray' }}>Change password, only if you need to</Typography>
        <TextField 
          name="currentPassword"
          label="Current Password" 
          type="password"
          value={editedProfile.currentPassword || ''} 
          onChange={handleInputChange}
          fullWidth 
          sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} 
        />
        <TextField 
          name="newPassword"
          label="New Password" 
          type="password"
          value={editedProfile.newPassword || ''} 
          onChange={handleInputChange}
          fullWidth 
          sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} 
        />
        <TextField 
          name="phoneNumber"
          label="Phone Number" 
          value={editedProfile.phoneNumber || ''} 
          onChange={handleInputChange}
          fullWidth 
          sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} 
        />
      </Box>
      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2, marginTop: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'purple' }}>
          <House sx={{ marginRight: 1 }} /> Address Details
        </Typography>
        <TextField 
          name="address"
          label="Address" 
          value={editedProfile.address || ''} 
          onChange={handleInputChange}
          fullWidth 
          multiline 
          rows={4} 
          sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            sx={{ backgroundColor: '#FFB74D' }} 
            startIcon={<Save />}
            onClick={handleSaveProfile}
          >
            Save
          </Button>
        </Box>
      </Box>
      <Button 
        className='delete-btn' 
        variant="contained" 
        color="error" 
        size="small" 
        startIcon={<Delete />}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>

      <ProfileModal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        verificationCode={deletionVerificationCode}
      />
    </div>
  );
};

export default Profile;