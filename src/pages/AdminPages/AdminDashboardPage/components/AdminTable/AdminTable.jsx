import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Box, Typography, CircularProgress, Avatar, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip
} from "@mui/material";
import { Add, Edit, Delete, FilterAlt } from "@mui/icons-material";
import AdminModal from "../AdminModal/AdminModal";
import "./AdminTable.css";
import * as adminPetsService from "../../../../../services/adminPetsService";
import { PulseLoader } from "react-spinners";

const AdminTable = ({ selectedPetType }) => {
  // States
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  // Fetch pets on component mount
  useEffect(() => {
    fetchPets();
  }, []);

  // Filter pets when selectedPetType changes or pets array changes
  useEffect(() => {
    if (selectedPetType) {
      const filtered = pets.filter(pet => pet.type === selectedPetType);
      setFilteredPets(filtered);
    } else {
      setFilteredPets(pets);
    }
  }, [selectedPetType, pets]);

  // Fetch all pets
  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await adminPetsService.getAllPets();
      setPets(data);
      // Initialize filteredPets with all pets or filtered if there's a selectedPetType
      if (selectedPetType) {
        setFilteredPets(data.filter(pet => pet.type === selectedPetType));
      } else {
        setFilteredPets(data);
      }
    } catch (error) {
      showAlert("Error loading pets", "error");
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal open for add new pet
  const handleAddNew = () => {
    setCurrentPet(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  // Handle modal open for edit pet
  const handleEdit = (pet) => {
    setCurrentPet(pet);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handle delete pet
  const handleDelete = (pet) => {
    setPetToDelete(pet);
    setDeleteDialogOpen(true);
  };

  // Confirm delete pet
  const confirmDelete = async () => {
    try {
      await adminPetsService.deletePet(petToDelete.id);
      fetchPets();
      showAlert("Pet successfully removed", "success");
    } catch (error) {
      showAlert("Error deleting pet", "error");
      console.error("Error deleting pet:", error);
    } finally {
      setDeleteDialogOpen(false);
      setPetToDelete(null);
    }
  };

  // Save pet (create or update)
  const handleSave = async (formData) => {
    try {
      if (isEditing && currentPet) {
        // Update existing pet
        await adminPetsService.updatePet(currentPet.id, formData);
        showAlert("Pet updated successfully", "success");
      } else {
        // Create new pet
        await adminPetsService.createPet(formData);
        showAlert("Pet added successfully", "success");
      }
      setModalOpen(false);
      fetchPets();
    } catch (error) {
      showAlert(
        `Error ${isEditing ? "updating" : "creating"} pet`,
        "error"
      );
      console.error("Error saving pet:", error);
    }
  };

  // Show alert message
  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  return (
    <div className="admin-table-container">
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">Manage pets</Typography>
          {selectedPetType && (
            <Chip
              icon={<FilterAlt />}
              label={`Filter: ${selectedPetType}s`}
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#FFB74D', '&:hover': { backgroundColor: '#FFA726' } }}
          startIcon={<Add />}
          onClick={handleAddNew}
        >
          Add new
        </Button>
      </Box>

      {/* Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <PulseLoader size={20} color="#000000" />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Specie</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.type}</TableCell>
                    <TableCell>{pet.specie}</TableCell>
                    <TableCell>{pet.age}</TableCell>
                    <TableCell>{pet.size}</TableCell>
                    <TableCell>{pet.gender}</TableCell>
                    <TableCell>
                      {pet.description.length > 30
                        ? `${pet.description.substring(0, 30)}...`
                        : pet.description}
                    </TableCell>
                    <TableCell>
                      {pet.photo ? (
                        <Avatar
                          alt={pet.name}
                          src={pet.photo}
                          sx={{ width: 40, height: 40 }}
                        />
                      ) : (
                        "No photo"
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(pet)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(pet)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    {selectedPetType
                      ? `No ${selectedPetType}-type pets available`
                      : "No pets available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Modal */}
      <AdminModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSave={handleSave}
        pet={currentPet}
        isEditing={isEditing}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          ¿Are you sure you want to delete {petToDelete?.name}? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminTable;