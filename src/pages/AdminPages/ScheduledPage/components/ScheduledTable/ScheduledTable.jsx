import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import "./ScheduledTable.css";

const sampleData = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    specie: "Golden Retriever",
    age: "3 years",
    size: "Medium",
    gender: "Male",
    description: "Friendly and playful",
    adopter: "John Doe",
    date: "2025-04-15",
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
    adopter: "Jane Smith",
    date: "2025-04-20",
  },
];

const ScheduledTable = () => {
  return (
    <div className="scheduled-table-container">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" sx={{ color: 'black'}}>Scheduled Adoptions</Typography>
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
              <TableCell>Adopter</TableCell>
              <TableCell>Date</TableCell>
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
                <TableCell>{pet.adopter}</TableCell>
                <TableCell>{pet.date}</TableCell>
                <TableCell>
                  <IconButton color="success">
                    <CheckCircle />
                  </IconButton>
                  <IconButton color="error">
                    <Cancel />
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

export default ScheduledTable;
