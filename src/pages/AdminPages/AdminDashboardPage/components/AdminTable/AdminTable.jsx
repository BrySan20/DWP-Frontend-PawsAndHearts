import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box, Typography } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import AdminModal from "../AdminModal/AdminModal";
import "./AdminTable.css";

const sampleData = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    specie: "Golden Retriever",
    age: "3 years",
    size: "Medium",
    gender: "Male",
    description: "Friendly and active",
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    specie: "Siamese",
    age: "2 years",
    size: "Small",
    gender: "Female",
    description: "Loves cuddles",
  },
];

const AdminTable = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-table-container">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5">Manage Pets</Typography>
        <Button variant="contained" sx={{backgroundColor: '#FFB74D'}} startIcon={<Add />} onClick={() => setOpen(true)}>
          Add
        </Button>
        <AdminModal open={open} handleClose={() => setOpen(false)} handleSave={(data) => console.log(data)} />
      </Box>

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.type}</TableCell>
                <TableCell>{pet.specie}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.size}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminTable;
