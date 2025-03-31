import React from "react";
import { Box, Button } from "@mui/material";
import { Pets } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ 
  onPetTypeSelect = () => {}, 
  selectedType 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePetTypeClick = (type) => {
    if (location.pathname !== "/admindashboard") {
      localStorage.setItem('selectedAdminPetType', type === null ? 'all' : type);
      navigate("/admindashboard");
      return;
    }

    if (selectedType === type) {
      onPetTypeSelect(null);
    } else {
      onPetTypeSelect(type);
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <Box className="sidebar-container">
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === null ? "selected" : ""}`}
        onClick={() => handlePetTypeClick(null)}
      >
        All pets
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Bird" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Bird")}
      >
        Birds
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Cat" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Cat")}
      >
        Cats
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Dog" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Dog")}
      >
        Dogs
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Reptile" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Reptile")}
      >
        Reptiles
      </Button>
      <Button
        startIcon={<Pets />}
        className="sidebar-button"
        onClick={() => handleNavigation("/scheduled")}
      >
        Scheduled adoptions
      </Button>
      <Button
        startIcon={<Pets />}
        className="sidebar-button"
        onClick={() => handleNavigation("/completed")}
      >
        Completed adoptions
      </Button>
    </Box>
  );
};

export default Sidebar;