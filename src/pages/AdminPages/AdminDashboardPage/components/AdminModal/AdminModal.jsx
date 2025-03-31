import React, { useState, useEffect } from "react";
import {
    Modal, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Avatar
} from "@mui/material";
import { CloudUpload, Save, Close } from "@mui/icons-material";
import "./AdminModal.css";

const AdminModal = ({ open, handleClose, handleSave, pet, isEditing }) => {
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

    const [photoPreview, setPhotoPreview] = useState(null);

    // Reset form when the modal opens/closes or pet changes
    useEffect(() => {
        if (open) {
            if (isEditing && pet) {
                // If editing, populate form with pet data
                setFormData({
                    name: pet.name || "",
                    type: pet.type || "",
                    specie: pet.specie || "",
                    age: pet.age || "",
                    size: pet.size || "",
                    gender: pet.gender || "",
                    description: pet.description || "",
                    photo: null, // We don't set the file object, just the URL for preview
                });
                setPhotoPreview(pet.photo || null);
            } else {
                // If adding new, reset form
                resetForm();
            }
        }
    }, [open, pet, isEditing]);

    const resetForm = () => {
        setFormData({
            name: "",
            type: "",
            specie: "",
            age: "",
            size: "",
            gender: "",
            description: "",
            photo: null,
        });
        setPhotoPreview(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = () => {
        // If editing and no new photo was selected, keep the existing photo URL
        if (isEditing && !formData.photo && pet.photo) {
            handleSave({ ...formData, photo: pet.photo });
        } else {
            handleSave(formData);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="modal-container">
                <Typography variant="h6" className="modal-title">
                    {isEditing ? "Edit pet" : "Add pet"}
                </Typography>

                <Box className="modal-content">
                    {/* Primera columna */}
                    <Box className="modal-column">
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            fullWidth
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[0-9]/g, '');
                            }}
                            required
                        />
                        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                label="Type"
                            >
                                <MenuItem value="">Select...</MenuItem>
                                <MenuItem value="Bird">Bird</MenuItem>
                                <MenuItem value="Cat">Cat</MenuItem>
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Reptile">Reptile</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Specie"
                            name="specie"
                            value={formData.specie}
                            fullWidth
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[0-9]/g, '');
                            }}
                            required
                        />
                    </Box>

                    {/* Segunda columna */}
                    <Box className="modal-column">
                        <TextField
                            label="Age"
                            name="age"
                            value={formData.age}
                            fullWidth
                            onChange={handleChange}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            sx={{ marginBottom: 2 }}
                            required
                        />
                        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
                            <InputLabel>Size</InputLabel>
                            <Select
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                label="Size"
                            >
                                <MenuItem value="">Select...</MenuItem>
                                <MenuItem value="Small">Small</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Large">Large</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                label="Gender"
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
                            value={formData.description}
                            multiline
                            rows={4}
                            fullWidth
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                            required
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                startIcon={<CloudUpload />}
                            >
                                Upload photo
                                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                            </Button>

                            {photoPreview && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Avatar
                                        src={photoPreview}
                                        alt="Pet Preview"
                                        sx={{ width: 100, height: 100 }}
                                        variant="rounded"
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Botones */}
                <Box className="modal-actions">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={onSubmit}
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