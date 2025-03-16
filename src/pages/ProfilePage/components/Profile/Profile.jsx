import React from 'react';
import { TextField, Button, IconButton, Box, Typography } from '@mui/material';
import { Edit, House, Delete, Save } from '@mui/icons-material';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: 'blue' }}>Nombre del Usuario</Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>usuario@correo.com</Typography>
      </Box>

      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2, marginTop: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
          <Edit sx={{ marginRight: 1 }} /> Your data
        </Typography>

        <TextField label="Email" fullWidth sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} />
        <TextField label="Password" type="password" fullWidth sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} />
        <TextField label="Phone number" fullWidth sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} />
      </Box>

      <Box className="profile-box" sx={{ padding: 3, backgroundColor: '#FFF2CC', borderRadius: 2, marginTop: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'purple' }}>
          <House sx={{ marginRight: 1 }} /> Address details
        </Typography>
        <TextField label="Address" fullWidth multiline rows={4} sx={{ marginBottom: 2, backgroundColor: '#FFFFFF' }} />

        {/* Contenedor de botones en la esquina inferior derecha */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 2 }}>
          <Button variant="contained" color="primary" size="small" sx={{ backgroundColor: '#FFB74D' }} startIcon={<Save />}>
            Save
          </Button>
        </Box>
      </Box>
      <Button className='delete-btn' variant="contained" color="error" size="small" startIcon={<Delete />}>
        Delete account
      </Button>
    </div>
  );
};

export default Profile;
