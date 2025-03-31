import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid, Card, CardMedia, CardContent, Snackbar, Alert } from "@mui/material";
import { Favorite, FavoriteBorder, Pets, CalendarToday } from "@mui/icons-material";
import ModalSteps from "../ModalSteps/ModalSteps";
import ModalSchedule from "../ModalSchedule/ModalSchedule";
import * as adopterService from '../../../../services/adopterService';
import * as adoptService from '../../../../services/adoptPetService';
import './Details.css';

const Details = () => {
  const [pet, setPet] = useState(null);
  const [openSteps, setOpenSteps] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [adoptionEligibility, setAdoptionEligibility] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    const selectedPet = localStorage.getItem('selectedPet');
    if (selectedPet) {
      const parsedPet = JSON.parse(selectedPet);
      setPet(parsedPet);
      console.log(parsedPet);

      const checkFavoriteAndAdoptionStatus = async () => {
        try {
          const petId = parsedPet.petId || parsedPet.id;


          if (petId) {
            const favoriteStatus = await adopterService.isPetInFavorites(petId);
            setIsFavorite(favoriteStatus);


            const eligibility = await adoptService.checkAdoptionEligibility(petId);
            setAdoptionEligibility(eligibility);
          } else {
            console.error("No valid pet ID found", parsedPet);
          }
        } catch (error) {
          console.error("Error checking status:", error);
        }
      };

      checkFavoriteAndAdoptionStatus();
    }
  }, []);

  const handleFavoriteToggle = async () => {
    try {
      const petId = pet.petId || pet.id || pet._id;

      if (isFavorite) {
        await adopterService.removeFromFavorites(petId);
      } else {
        await adopterService.addToFavorites(petId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleAdoptClick = () => {
    if (!adoptionEligibility) return;

    if (!adoptionEligibility.allowed) {
      let message = '';
      if (adoptionEligibility.reason === 'user_has_pending_adoption') {
        message = 'You already have a pending adoption request. Please complete or cancel your current request.';
      } else if (adoptionEligibility.reason === 'pet_in_adoption_process') {
        message = 'This pet is currently in the process of being adopted by another person.';
      }

      setSnackbar({
        open: true,
        message,
        severity: 'warning'
      });
    } else {
      setOpenSchedule(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (!pet) {
    return <Typography>Cargando detalles de la mascota...</Typography>;
  }

  return (
    <div className="details-container">
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: 'black' }}>
        {pet.name}
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>

        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="300"
              image={pet.photo || "/src/assets/images/logo.png"}
              alt={pet.name}
            />
          </Card>
        </Grid>


        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Pet ID: {pet.petId}
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Description:
              </Typography>
              <Typography variant="body1">
                {pet.description}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Age: {pet.age} years old
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Size: {pet.size}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Gender: {pet.gender}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2, backgroundColor: '#FFB74D' }}
          onClick={() => setOpenSteps(true)}
        >
          <Pets sx={{ marginRight: 1 }} />
          Steps to adopt
        </Button>
        <Button
          variant="outlined"
          color={isFavorite ? "primary" : "secondary"}
          sx={{ marginRight: 2 }}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? <Favorite sx={{ marginRight: 1 }} /> : <FavoriteBorder sx={{ marginRight: 1 }} />}
          Favorite
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleAdoptClick}
          disabled={!adoptionEligibility || !adoptionEligibility.allowed}
        >
          <CalendarToday sx={{ marginRight: 1 }} />
          Adopt
        </Button>
      </Box>


      <ModalSteps open={openSteps} handleClose={() => setOpenSteps(false)} />
      <ModalSchedule
        open={openSchedule}
        handleClose={() => setOpenSchedule(false)}
        onAdoptionComplete={() => {

          setAdoptionEligibility({ allowed: false, reason: 'user_has_pending_adoption' });
        }}
      />


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Details;