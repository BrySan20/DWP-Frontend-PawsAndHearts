import React from "react";
import { Box, Grid, Typography, Container, useMediaQuery, useTheme } from "@mui/material";
import { AccessTime, LocationOn, Phone, Info } from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const logoPath = "/src/assets/images/logo.png";

  return (
    <Box className="footer-container">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} className="footer-grid">
          <Grid item xs={12} sm={6} md={2.4} className="footer-column logo-column">
            <Box className="footer-logo-container">
              <img src={logoPath} alt="Company Logo" className="footer-logo" />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <AccessTime className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Business Hours
              </Typography>
              <Typography variant="body2" className="footer-text">
                Monday to Friday: 9:00 - 18:00
              </Typography>
              <Typography variant="body2" className="footer-text">
                Saturday: 9:00 - 13:00
              </Typography>
              <Typography variant="body2" className="footer-text">
                Sunday: Closed
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <LocationOn className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Address
              </Typography>
              <Typography variant="body2" className="footer-text">
                742 Evergreen Terrace
              </Typography>
              <Typography variant="body2" className="footer-text">
                Springfield, ST 12345
              </Typography>
              <Typography variant="body2" className="footer-text">
                United States
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section">
              <Box className="footer-icon-container">
                <Phone className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                Contact Us
              </Typography>
              <Typography variant="body2" className="footer-text">
                Phone: (555) 123-4567
              </Typography>
              <Typography variant="body2" className="footer-text">
                WhatsApp: +1 555 987-6543
              </Typography>
              <Typography variant="body2" className="footer-text">
                Email: info@p&h.com
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} className="footer-column">
            <Box className="footer-section rights-section">
              <Box className="footer-icon-container">
                <Info className="footer-icon" />
              </Box>
              <Typography variant="h6" className="footer-title">
                About Us
              </Typography>
              <Typography variant="body2" className="footer-text">
                Caring for your pets with love since 2010.
              </Typography>
              <Typography variant="body2" className="footer-copyright">
                © {new Date().getFullYear()} Paws & Hearts
              </Typography>
              <Typography variant="body2" className="footer-text">
                All rights reserved
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {isMobile && (
          <Box className="mobile-copyright">
            <Typography variant="body2" className="footer-copyright text-center">
              © {new Date().getFullYear()} Paws & Hearts - All rights reserved
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
