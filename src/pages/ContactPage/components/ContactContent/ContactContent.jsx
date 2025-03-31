import React, { useState } from "react";
import {
  Typography, Grid, Paper, Box, List, ListItem, ListItemIcon, ListItemText, Divider,
  Accordion, AccordionSummary, AccordionDetails, Container, Button
} from "@mui/material";
import {
  Email, Phone, AccessTime, Place, ExpandMore, QuestionAnswer, Send
} from "@mui/icons-material";
import SendEmailModal from "../SendEmailModal/SendEmailModal";
import "./ContactContent.css";

const ContactContent = () => {
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const email = localStorage.getItem("email");

  const handleOpenEmailModal = () => {
    setOpenEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
  };

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
                <Typography variant="h6">pawsandheartsdwp@gmail.com</Typography>
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

              <Button
                variant="contained"
                color="primary"
                startIcon={<Send />}
                onClick={handleOpenEmailModal}
                sx={{ mt: 2, mb: 3 }}
              >
                Do you have any question? Send us an email
              </Button>
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
                Visit our office in person
              </Typography>

              <Box className="address-item">
                <Place color="primary" className="contact-icon" />
                <Typography variant="body1">
                  UTEQ - Universidad Tecnológica de Querétaro<br />
                  Querétaro, Mexico
                </Typography>
              </Box>

              <Box className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=20.653976,-100.405544&z=15&output=embed"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="UTEQ Location"
                ></iframe>
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

      {/* Modal de envío de correo */}
      <SendEmailModal
        open={openEmailModal}
        onClose={handleCloseEmailModal}
        defaultRecipient="bryangames1680@gmail.com"
      />
    </Container>
  );
};

export default ContactContent;
