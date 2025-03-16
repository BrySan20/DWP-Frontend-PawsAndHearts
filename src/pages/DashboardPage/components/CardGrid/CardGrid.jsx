import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import { Pets } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";

// Datos de ejemplo para las mascotas
const pets = [
  { name: "Bella", age: 3, description: "Friendly and playful dog", image: "/src/assets/images/logo.png", id: 1 },
  { name: "Milo", age: 2, description: "Loves to sleep and cuddle", image: "/src/assets/images/logo.png", id: 2 },
  { name: "Charlie", age: 4, description: "Active and energetic cat", image: "/src/assets/images/logo.png", id: 3 },
  { name: "Max", age: 5, description: "Very calm and affectionate", image: "/src/assets/images/logo.png", id: 4 },
  { name: "Luna", age: 1, description: "Curious and playful kitten", image: "/src/assets/images/logo.png", id: 5 },
  { name: "Oliver", age: 6, description: "Loyal and protective dog", image: "/src/assets/images/logo.png", id: 6 },
  { name: "Leo", age: 3, description: "Loves to run and jump", image: "/src/assets/images/logo.png", id: 7 },
  { name: "Daisy", age: 4, description: "A bit shy but loves attention", image: "/src/assets/images/logo.png", id: 8 },
  { name: "Nala", age: 2, description: "Very affectionate cat", image: "/src/assets/images/logo.png", id: 9 },
  { name: "Rocky", age: 5, description: "Loves to play and explore", image: "/src/assets/images/logo.png", id: 10 }
];

const CardGrid = () => {
  const navigate = useNavigate();

  return (
    <Box className="card-grid-container">
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {pets.map((pet) => (
          <Grid 
            item 
            key={pet.id} 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            xl={2.4}
            className="grid-item"
          >
            <Card className="pet-card" sx={{backgroundColor: "#FFF2CC"}}>
              <CardMedia
                component="img"
                height={{ xs: 140, sm: 160, md: 170 }}
                image={pet.image}
                alt={pet.name}
                className="pet-image"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="h6" className="pet-name">
                  {pet.name}
                </Typography>
                <Typography variant="body2" className="pet-age">
                  {pet.age} years old
                </Typography>
                <Typography variant="body1" className="pet-description">
                  {pet.description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" marginTop="auto" pt={1}>
                  <Button 
                    variant="contained" 
                    startIcon={<Pets />} 
                    onClick={() => navigate("/details")}
                    size="small"
                    sx={{ 
                      mt: "auto",
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardGrid;