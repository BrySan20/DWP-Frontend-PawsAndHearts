import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showErrorMessage, showInfoMessage } from './alertMessages';

/**
 * Componente que monitorea cambios en la ruta
 * Si el usuario navega a /login o rutas de administrador, limpia las credenciales
 */
const RouteChangeGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = location.pathname;

      // Si el usuario navega al login, limpiar credenciales
      if (currentPath === '/' || currentPath === '/register') {
        localStorage.clear();
        //showInfoMessage('Sesión cerrada', 'Vuelve a iniciar sesión');
      }

      // Si la ruta no existe (404), redirigir al login después de mostrar un mensaje
      if (currentPath === '/404') {
        setTimeout(() => {
          showErrorMessage('Action not permitted', 'You are not allowed to perform this action, please log in again.');
          navigate('/');
        }, 1000);
      }

      // Verificar si es una ruta de administrador
      const adminRoutes = ['/admindashboard', '/scheduled', '/completed'];
      const userRole = localStorage.getItem('role');

      if (adminRoutes.includes(currentPath) && userRole !== 'admin') {
        localStorage.clear();
      }
    };

    handleRouteChange();
  }, [location.pathname, navigate]);

  return null; // Este componente no renderiza nada
};

export default RouteChangeGuard;