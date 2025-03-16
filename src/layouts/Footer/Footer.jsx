import React from "react";
import { Box, Grid, Typography, Container, useMediaQuery, useTheme } from "@mui/material";
import { AccessTime, LocationOn, Phone, Info } from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Podrías reemplazar esto con la ruta a tu logo real
  const logoPath = "/src/assets/images/logo.png";

  return (
    <Box className="footer-container">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} className="footer-grid">
          {/* Columna 1: Logo */}
          <Grid item xs={12} sm={6} md={2.4} className="footer-column logo-column">
            <Box className="footer-logo-container">
              <img src={logoPath} alt="Logo de la empresa" className="footer-logo" />
            </Box>
          </Grid>

          {/* Columna 2: Horario de atención */}
          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <AccessTime className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Horario de Atención
              </Typography>
              <Typography variant="body2" className="footer-text">
                Lunes a Viernes: 9:00 - 18:00
              </Typography>
              <Typography variant="body2" className="footer-text">
                Sábados: 9:00 - 13:00
              </Typography>
              <Typography variant="body2" className="footer-text">
                Domingos: Cerrado
              </Typography>
            </Box>
          </Grid>

          {/* Columna 3: Dirección */}
          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <LocationOn className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Dirección
              </Typography>
              <Typography variant="body2" className="footer-text">
                Av. Siempre Viva 742
              </Typography>
              <Typography variant="body2" className="footer-text">
                Springfield, ST 12345
              </Typography>
              <Typography variant="body2" className="footer-text">
                Estados Unidos
              </Typography>
            </Box>
          </Grid>

          {/* Columna 4: Teléfono */}
          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <Phone className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Contáctanos
              </Typography>
              <Typography variant="body2" className="footer-text">
                Tel: (555) 123-4567
              </Typography>
              <Typography variant="body2" className="footer-text">
                WhatsApp: +1 555 987-6543
              </Typography>
              <Typography variant="body2" className="footer-text">
                Email: info@p&h.com
              </Typography>
            </Box>
          </Grid>

          {/* Columna 5: Derechos reservados */}
          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section rights-section">
              <Box className="footer-icon-container">
                <Info className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Acerca de Nosotros
              </Typography>
              <Typography variant="body2" className="footer-text">
                Cuidamos con amor a tus mascotas desde 2010.
              </Typography>
              <Typography variant="body2" className="footer-copyright">
                © {new Date().getFullYear()} Paws & Hearts
              </Typography>
              <Typography variant="body2" className="footer-text">
                Todos los derechos reservados
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Línea de copyright para móviles - aparece solo en vista móvil */}
        {isMobile && (
          <Box className="mobile-copyright">
            <Typography variant="body2" className="footer-copyright text-center">
              © {new Date().getFullYear()} Paws & Hearts - Todos los derechos reservados
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Footer;