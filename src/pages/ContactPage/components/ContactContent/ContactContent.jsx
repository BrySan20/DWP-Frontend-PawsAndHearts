import React from "react";
import { Typography, Grid, Paper, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails, Container } from "@mui/material";
import { Email, Phone, AccessTime, Place, ExpandMore, QuestionAnswer } from "@mui/icons-material";
import "./ContactContent.css";

const ContactContent = () => {
  return (
    <Container className="contact-container">
      <Typography variant="h2" className="main-title" gutterBottom>
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Primera columna */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="contact-paper">
            <Box className="contact-info-section">
              <Typography variant="h4" className="section-title" sx={{ mb: 3 }}>
                Contact us at
              </Typography>

              <Box className="contact-item">
                <Email color="primary" className="contact-icon" />
                <Typography variant="h6">email@example.com</Typography>
              </Box>

              <Box className="contact-item">
                <Phone color="primary" className="contact-icon" />
                <Typography variant="h6">+52 419 122 7996</Typography>
              </Box>

              <Box className="contact-item">
                <AccessTime color="primary" className="contact-icon" />
                <Typography variant="body1" className="hours-text">
                  <strong>Hours of Operation:</strong><br />
                  Monday - Friday, 9:00 AM - 6:00 PM
                </Typography>
              </Box>
            </Box>

            <Divider className="divider" />

            <Box className="faq-section">
              <Typography variant="h4" className="section-title" sx={{ mb: 3 }}>
                Frequently Asked Questions
              </Typography>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box className="faq-title">
                    <QuestionAnswer color="primary" className="faq-icon" />
                    <Typography variant="h6">How can I adopt a pet?</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Once you choose your pet, you need to schedule an appointment at our offices.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Box className="faq-title">
                    <QuestionAnswer color="primary" className="faq-icon" />
                    <Typography variant="h6">What documents do I need to adopt?</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    You need your ID, proof of address, proof of income, pet profile and the adoption application.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Box className="faq-title">
                    <QuestionAnswer color="primary" className="faq-icon" />
                    <Typography variant="h6">Can I visit the pet before adopting it?</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Of course, you can do this by scheduling the date and time.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Paper>
        </Grid>

        {/* Segunda columna */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="contact-paper">
            <Box className="office-section">
              <Typography variant="h4" className="section-title" sx={{ mb: 3 }}>
                Visit our offices in person
              </Typography>

              <Box className="address-item">
                <Place color="primary" className="contact-icon" />
                <Typography variant="body1">
                  123 Pet Adoption Avenue<br />
                  Guanajuato, Mexico
                </Typography>
              </Box>

              <Box className="map-container">
                <img
                  src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                  alt="Office Location Map"
                  className="map-image"
                />
              </Box>

              <Box className="directions-section">
                <Typography variant="h6" className="directions-title">
                  How to get here
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Place color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="From downtown: Take Main Street and turn right on Pet Avenue" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Place color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Public transport: Bus lines 15, 23 and 45 stop right in front" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactContent;