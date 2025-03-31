import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import { Pets } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as PetService from "../../../../services/adopterService";
import * as FavoritesService from "../../../../services/userFavoritesService";
import { PulseLoader } from "react-spinners";
import "./CardGrid.css";

const CardGrid = ({
  selectedPetType,
  showFavorites = false,
  searchFilters = null
}) => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        let fetchedPets;

        if (showFavorites) {
          fetchedPets = await FavoritesService.getUserFavorites();
        } else {
          fetchedPets = await PetService.getAllPets();
        }

        if (searchFilters) {
          fetchedPets = fetchedPets.filter(pet => {
            const nameMatch = searchFilters.name
              ? pet.name.toLowerCase().includes(searchFilters.name.toLowerCase())
              : true;

            const ageMatch = pet.age >= searchFilters.age[0] &&
              pet.age <= searchFilters.age[1];

            const genderMatch = searchFilters.gender
              ? pet.gender === searchFilters.gender
              : true;

            const sizeMatch = searchFilters.size
              ? pet.size === searchFilters.size
              : true;

            return nameMatch && ageMatch && genderMatch && sizeMatch;
          });
        }

        if (selectedPetType) {
          fetchedPets = fetchedPets.filter(pet => pet.type === selectedPetType);
        }

        setPets(fetchedPets);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPets();
  }, [showFavorites, selectedPetType, searchFilters]);

  const handlePetDetails = (pet) => {
    const petToStore = {
      petId: pet.petId || pet.id,
      ...pet
    };
    localStorage.setItem('selectedPet', JSON.stringify(petToStore));
    navigate(`/details/${petToStore.petId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <PulseLoader size={20} color="#000000" />
      </Box>
    );
  }
  
  if (error) {
    return <Typography color="error">Error loading pets</Typography>;
  }

  return (
    <Box className="card-grid-container">
      {pets.length === 0 ? (
        <Typography variant="h6" align="center">
          {showFavorites
            ? "You don't have favorite pets"
            : "There aren't pets that match your search"}
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {pets.map((pet) => (
            <Grid
              item
              key={pet.petId || pet.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              className="grid-item"
            >
              <Card
                className="pet-card"
                sx={{
                  backgroundColor: "#FFF2CC",
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Card content remains the same as before */}
                <CardMedia
                  component="img"
                  image={pet.photo || "/src/assets/images/logo.png"}
                  alt={pet.name}
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <CardContent sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <Typography variant="h6" className="pet-name">
                    {pet.name}, {pet.type}
                  </Typography>
                  <Typography variant="body2" className="pet-age">
                    {pet.age} years old
                  </Typography>
                  <Typography variant="body1" className="pet-description">
                    {pet.description}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    marginTop="auto"
                    pt={1}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Pets />}
                      onClick={() => handlePetDetails(pet)}
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
      )}
    </Box>
  );
};

export default CardGrid;