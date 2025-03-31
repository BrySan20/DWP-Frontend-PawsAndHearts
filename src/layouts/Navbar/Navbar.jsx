import React, { useState } from "react";
import {
  Box, Button, InputAdornment, TextField, IconButton, Popover, List, ListItem,
  ListItemText, Checkbox, FormControlLabel, Slider, Typography
} from "@mui/material";
import {
  Home, Person, Mail, Search, ExitToApp, FilterList
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import Swal from "sweetalert2";
import "./Navbar.css";

const Navbar = ({ onSearchFilters }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    age: [1, 20],
    gender: '',
    size: ''
  });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedFilters(prev => ({
      ...prev,
      name: event.target.value
    }));
  };

  const handleAgeChange = (event, newValue) => {
    setSelectedFilters(prev => ({
      ...prev,
      age: newValue
    }));
  };

  const handleFilterSelection = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearch = () => {
    const hasSelectedFilter = Object.values(selectedFilters).some(filter => {
      if (Array.isArray(filter)) {
        return filter[0] !== 1 || filter[1] !== 20;
      }
      return filter !== '';
    });

    if (!hasSelectedFilter) {
      alert('Please select a filter before searching.');
      return;
    }

    if (onSearchFilters) {
      onSearchFilters(selectedFilters);
    } else {
      console.warn('onSearchFilters prop not provided');
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your session will be closed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <Box className="navbar-container">
      <Box className="navbar-left">
        <Box className="navbar-logo">
          <img src="/src/assets/images/logo.png" alt="Logo" className="navbar-logo-image" />
        </Box>
        <Box className="navbar-nav-buttons">
          <Button startIcon={<Home />} className="navbar-button" onClick={() => navigate("/dashboard")}>Home</Button>
          <Button startIcon={<Person />} className="navbar-button" onClick={() => navigate("/profile")}>Profile</Button>
          <Button startIcon={<Mail />} className="navbar-button" onClick={() => navigate("/contact")}>Contact</Button>
        </Box>
      </Box>
      <Box className="navbar-right">
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            className="navbar-search"
            placeholder="Search by Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleFilterClick}>
                    <FilterList />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "30px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Box>
        <Button
          startIcon={<ExitToApp />}
          className="navbar-logout"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2} width={300}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          <Box mb={2}>
            <Typography gutterBottom>Age Range</Typography>
            <Slider
              value={selectedFilters.age}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              min={1}
              max={20}
              marks={[
                { value: 1, label: '1' },
                { value: 20, label: '20' }
              ]}
            />
          </Box>

          <Box mb={2}>
            <Typography gutterBottom>Gender</Typography>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.gender === 'Male'}
                    onChange={() => handleFilterSelection('gender', 'Male')}
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.gender === 'Female'}
                    onChange={() => handleFilterSelection('gender', 'Female')}
                  />
                }
                label="Female"
              />
            </Box>
          </Box>

          <Box>
            <Typography gutterBottom>Size</Typography>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.size === 'Large'}
                    onChange={() => handleFilterSelection('size', 'Large')}
                  />
                }
                label="Large"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.size === 'Medium'}
                    onChange={() => handleFilterSelection('size', 'Medium')}
                  />
                }
                label="Medium"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.size === 'Small'}
                    onChange={() => handleFilterSelection('size', 'Small')}
                  />
                }
                label="Small"
              />
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Navbar;
