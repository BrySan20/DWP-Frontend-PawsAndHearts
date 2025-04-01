import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import jsPDF from 'jspdf';

const ModalSteps = ({ open, handleClose }) => {
  const generateAdoptionApplication = () => {
    const doc = new jsPDF();
    
    // Add a logo or header image (placeholder for now)
    doc.setFillColor(71, 120, 194);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Add paw print decoration
    doc.setFillColor(52, 89, 149);
    doc.circle(20, 15, 5, 'F');
    doc.circle(190, 15, 5, 'F');
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Pet Adoption Application', 105, 20, { align: 'center' });
    
    // Reset color for content
    doc.setTextColor(0, 0, 0);
    
    // Welcome message
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your interest in adopting a new friend! Please fill out this', 105, 40, { align: 'center' });
    doc.text('application completely and accurately to help us find the perfect match.', 105, 46, { align: 'center' });
    
    // Applicant Information section
    doc.setFillColor(230, 240, 250);
    doc.rect(12, 55, 186, 50, 'F');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 120, 194);
    doc.text('Applicant Information', 20, 65);
    
    // Form fields
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Full Name: ____________________________________________', 20, 75);
    doc.text('Address: ____________________________________________', 20, 85);
    doc.text('Phone: ________________________  Email: ________________________', 20, 95);
    
    // Pet Information section
    doc.setFillColor(230, 240, 250);
    doc.rect(12, 110, 186, 35, 'F');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 120, 194);
    doc.text('Pet Information', 20, 120);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Pet Name: ________________________  Pet ID: ________________________', 20, 130);
    doc.text('Species: ________________________  Breed: ________________________', 20, 140);
    
    // Required Documents section
    doc.setFillColor(230, 240, 250);
    doc.rect(12, 150, 186, 50, 'F');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 120, 194);
    doc.text('Required Documents', 20, 160);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Please attach the following documents to your application:', 25, 170);
    doc.text('1.- Official ID', 20, 180);
    doc.text('2.- Proof of Address', 20, 190);
    doc.text('3.- Proof of Income', 20, 200);
    
    // Footer with decorative elements
    doc.setFillColor(71, 120, 194);
    doc.rect(0, 270, 210, 27, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(255, 255, 255);
    doc.text('Paws & Hearts Pet Adoption Center', 105, 280, { align: 'center' });
    doc.text('123 Pet Street, Animal City • pawsandheartsdwp@gmail.com • https://dwp-frontend-pawsandhearts.onrender.com/', 105, 286, { align: 'center' });
    
    // Page numbers
    doc.setFontSize(10);
    doc.text('Page 1 of 1', 105, 292, { align: 'center' });
    
    doc.save('adoption_application.pdf');
  };

  const generatePetProfile = () => {
    // Retrieve pet details from localStorage
    const pet = JSON.parse(localStorage.getItem('selectedPet'));

    if (!pet) {
      alert('Please select a pet first');
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(230, 126, 34); // Orange
    doc.rect(0, 0, 210, 30, 'F');
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Pet Profile', 105, 20, { align: 'center' });
    
    // Pet name as subtitle
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(`Meet ${pet.name}!`, 105, 28, { align: 'center' });
    
    // Add pet photo
    if (pet.photo) {
      try {
        doc.addImage(pet.photo, 'JPEG', 65, 40, 80, 80);
        
        // Add decorative frame around the image
        doc.setDrawColor(230, 126, 34);
        doc.setLineWidth(2);
        doc.rect(63, 38, 84, 84);
      } catch (e) {
        console.error("Error adding image:", e);
      }
    }
    
    // Pet details section
    doc.setFillColor(252, 243, 207); // Light yellow
    doc.rect(12, 130, 186, 80, 'F');
    
    // Pet information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(230, 126, 34);
    doc.text('Pet Details', 20, 140);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    doc.text(`Name: ${pet.name}`, 20, 150);
    doc.text(`Age: ${pet.age} years`, 20, 160);
    doc.text(`Breed: ${pet.breed || 'Mixed'}`, 20, 170);
    doc.text(`Gender: ${pet.gender || 'Unknown'}`, 20, 180);
    
    // Description header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(230, 126, 34);
    doc.text('About Me', 20, 195);
    
    // Description text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const description = pet.description || "This friendly pet is looking for a loving home!";
    const splitDescription = doc.splitTextToSize(description, 170);
    doc.text(splitDescription, 20, 205);
    
    // Contact information
    doc.setFillColor(252, 243, 207);
    doc.rect(12, 220, 186, 40, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(230, 126, 34);
    doc.text('Ready to Adopt?', 20, 230);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Contact Paws & Hearts Adoption Center:', 20, 240);
    doc.text('Phone: (419) 122 7996 • Email: pawsandheartsdwp@gmail.com', 20, 250);
    
    // Footer
    doc.setFillColor(230, 126, 34);
    doc.rect(0, 270, 210, 27, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(255, 255, 255);
    doc.text('Paws & Hearts Pet Adoption Center', 105, 280, { align: 'center' });
    doc.text('123 Pet Street, Animal City • https://dwp-frontend-pawsandhearts.onrender.com/', 105, 286, { align: 'center' });
    
    doc.save(`${pet.name}_profile.pdf`);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="steps-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="steps-modal-title" variant="h6" gutterBottom sx={{ color: "#4778C2", fontWeight: "bold" }}>
          Steps to Adopt Your Pet
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          1. Download the adoption application and pet profile, then complete them with the required information.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          2. Gather your official ID, proof of address, and proof of income.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: "black" }}>
          3. Bring all documents to our adoption center to begin the process.
        </Typography>
        <Typography variant="body2" sx={{ color: "#E67E22", fontWeight: "bold" }}>
          *All documents must be provided to complete the adoption process.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <Button 
            variant="contained" 
            sx={{ bgcolor: "#4778C2", "&:hover": { bgcolor: "#345989" } }}
            startIcon={<Download />} 
            fullWidth
            onClick={generateAdoptionApplication}
          >
            Download Adoption Application
          </Button>
          <Button 
            variant="contained" 
            sx={{ bgcolor: "#E67E22", "&:hover": { bgcolor: "#D35400" } }}
            startIcon={<Download />} 
            fullWidth
            onClick={generatePetProfile}
          >
            Download Pet Profile
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSteps;