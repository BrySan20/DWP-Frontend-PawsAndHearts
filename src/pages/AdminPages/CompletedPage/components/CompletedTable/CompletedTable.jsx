import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import { getCompletedAdoptions } from "../../../../../services/completedAdoptionService";
import { PulseLoader } from "react-spinners";
import "./CompletedTable.css";

const CompletedTable = () => {
  const [completedAdoptions, setCompletedAdoptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedAdoptions = async () => {
      try {
        setIsLoading(true);
        const data = await getCompletedAdoptions();
        setCompletedAdoptions(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchCompletedAdoptions();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <PulseLoader size={20} color="#000000" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error.message || "Failed to load completed adoptions"}</Typography>;
  }

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
            {completedAdoptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No completed adoptions found
                </TableCell>
              </TableRow>
            ) : (
              completedAdoptions.map((pet) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompletedTable;