import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Swal from "sweetalert2";
import { getScheduledAdoptions, processAdoptionRequest } from "../../../../../services/appointmentService";
import { PulseLoader } from "react-spinners";
import "./ScheduledTable.css";

const ScheduledTable = () => {
  const [scheduledAdoptions, setScheduledAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduledAdoptions();
  }, []);

  const fetchScheduledAdoptions = async () => {
    try {
      const data = await getScheduledAdoptions();
      setScheduledAdoptions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scheduled adoptions:", error);
      setLoading(false);
      Swal.fire("Error", "Could not fetch scheduled adoptions", "error");
    }
  };

  const handleAdoptionRequest = async (adoptionId, status) => {
    const confirmationMessage = status === 'approved' 
      ? "Are you sure you want to approve this adoption?" 
      : "Are you sure you want to reject this adoption?";

    const result = await Swal.fire({
      title: "Confirm Adoption Action",
      text: confirmationMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? "#3085d6" : "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: status === 'approved' ? "Approve" : "Reject"
    });

    if (result.isConfirmed) {
      try {
        await processAdoptionRequest(adoptionId, status);
        
        // Remove the processed adoption from the list
        setScheduledAdoptions(prev => 
          prev.filter(adoption => adoption.id !== adoptionId)
        );

        Swal.fire(
          status === 'approved' ? "Approved!" : "Rejected!", 
          `The adoption has been ${status}.`, 
          "success"
        );
      } catch (error) {
        console.error("Error processing adoption:", error);
        Swal.fire("Error", "Could not process the adoption", "error");
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <PulseLoader size={20} color="#000000" />
      </Box>
    );
  }

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
            {scheduledAdoptions.map((adoption) => (
              <TableRow key={adoption.id}>
                <TableCell>{adoption.name}</TableCell>
                <TableCell>{adoption.type}</TableCell>
                <TableCell>{adoption.specie}</TableCell>
                <TableCell>{adoption.age}</TableCell>
                <TableCell>{adoption.size}</TableCell>
                <TableCell>{adoption.gender}</TableCell>
                <TableCell>{adoption.description}</TableCell>
                <TableCell>{adoption.adopter}</TableCell>
                <TableCell>{adoption.date}</TableCell>
                <TableCell>
                  <IconButton 
                    color="success" 
                    onClick={() => handleAdoptionRequest(adoption.id, 'approved')}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleAdoptionRequest(adoption.id, 'rejected')}
                  >
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