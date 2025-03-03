import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import { Pets } from "@mui/icons-material";
import "./CardGrid.css";

// Datos de ejemplo para las mascotas con imágenes
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
  return (
    <Box className="card-grid-container">
      <Grid container spacing={4}>
        {pets.map((pet) => (
          <Grid item key={pet.id} className="grid-item">
            <Card className="pet-card" sx={{ backgroundColor: "#FFF2CC", height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="170"
                image={pet.image}
                alt={pet.name}
                className="pet-image"
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" className="pet-name">
                  {pet.name}
                </Typography>
                <Typography variant="body2" className="pet-age">
                  {pet.age} years old
                </Typography>
                <Typography variant="body1" className="pet-description">
                  {pet.description}
                </Typography>

                {/* Alinear botón en la esquina inferior derecha */}
                <Box display="flex" justifyContent="flex-end" marginTop="auto">
                  <Button variant="contained" startIcon={<Pets />}>
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