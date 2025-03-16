import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { CloudUpload, Save, Close } from "@mui/icons-material";
import "./AdminModal.css";

const AdminModal = ({ open, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        specie: "",
        age: "",
        size: "",
        gender: "",
        description: "",
        photo: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="modal-container">
                <Typography variant="h6" className="modal-title">
                    Add / Edit Pet
                </Typography>

                <Box className="modal-content">
                    {/* Primera columna */}
                    <Box className="modal-column">
                        <TextField label="Name" name="name" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                        <TextField label="Type" name="type" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                        <TextField label="Specie" name="specie" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                    </Box>

                    {/* Segunda columna */}
                    <Box className="modal-column">
                        <TextField label="Age" name="age" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                        <TextField label="Size" name="size" fullWidth onChange={handleChange} sx={{ marginBottom: 2 }} />
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select...</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

                    {/* Tercera columna */}
                    <Box className="modal-column">
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            fullWidth
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            startIcon={<CloudUpload />}
                        >
                            Upload Photo
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    </Box>
                </Box>

                {/* Botones */}
                <Box className="modal-actions">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={() => handleSave(formData)}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Close />}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AdminModal;
