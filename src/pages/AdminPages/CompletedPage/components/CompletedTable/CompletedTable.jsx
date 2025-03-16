import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import "./CompletedTable.css";

const sampleData = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    specie: "Labrador",
    age: "4 years",
    size: "Large",
    gender: "Female",
    description: "Loyal and energetic",
    adopter: "Michael Johnson",
    date: "2025-03-10",
  },
  {
    id: 2,
    name: "Simba",
    type: "Cat",
    specie: "Persian",
    age: "2 years",
    size: "Small",
    gender: "Male",
    description: "Calm and affectionate",
    adopter: "Emily Davis",
    date: "2025-02-25",
  },
];

const CompletedTable = () => {
  return (
    <div className="completed-table-container">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" sx={{color:'black'}}>Completed Adoptions</Typography>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompletedTable;
