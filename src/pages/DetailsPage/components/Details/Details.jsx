import React, { useState } from "react";
import { Button, Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Favorite, Pets, CalendarToday } from "@mui/icons-material";
import ModalSteps from "../ModalSteps/ModalSteps";
import ModalSchedule from "../ModalSchedule/ModalSchedule";
import './Details.css';

const Details = () => {
  const [openSteps, setOpenSteps] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  return (
    <div className="details-container">
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: 'black' }}>
        Mascota Nombre
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {/* Foto de la mascota */}
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="300"
              image="https://www.scripps.org/sparkle-assets/images/dogs_cats_rabbits_pets_1200x750-e017741227f7382c3ba7aaeb27b28297.jpg"
              alt="Mascota"
            />
          </Card>
        </Grid>

        {/* Descripción de la mascota */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Descripción:
              </Typography>
              <Typography variant="body1">
                Esta es una mascota muy amigable, le encanta jugar y pasear.
                Es ideal para personas que buscan un compañero leal y cariñoso.
                Está en busca de un hogar lleno de amor.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botones */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2, backgroundColor: '#FFB74D'  }} onClick={() => setOpenSteps(true)} >
          <Pets sx={{ marginRight: 1 }} />
          Steps to adopt
        </Button>
        <Button variant="outlined" color="secondary" sx={{ marginRight: 2}}>
          <Favorite sx={{ marginRight: 1 }} />
          Favorite
        </Button>
        <Button variant="contained" color="success" onClick={() => setOpenSchedule(true)}>
          <CalendarToday sx={{ marginRight: 1 }} />
          Adopt
        </Button>
      </Box>

      {/* Modales */}
      <ModalSteps open={openSteps} handleClose={() => setOpenSteps(false)} />
      <ModalSchedule open={openSchedule} handleClose={() => setOpenSchedule(false)} />
    </div>
  );
};

export default Details;
