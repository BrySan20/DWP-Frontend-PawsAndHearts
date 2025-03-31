import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  // Puedes personalizar los colores para que coincidan con tu proyecto de adopción de mascotas
  palette: {
    primary: {
      main: '#000db0', // Verde, ideal para proyectos relacionados con la naturaleza y los animales
    },
    secondary: {
      main: '#FFA726', // Naranja cálido, amigable
    },
  },
});

export default theme;