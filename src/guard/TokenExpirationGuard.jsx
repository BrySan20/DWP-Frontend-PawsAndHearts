import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { showWarningMessage, showErrorMessage } from './alertMessages';

/**
 * Componente que verifica si el token ha expirado
 * Se debe incluir en el componente principal de la aplicación
 */
const TokenExpirationGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');

      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Si el token está a punto de expirar (30 segundos antes)
        if (decoded.exp - currentTime < 30) {
          showWarningMessage('Session about to expire', 'Your session is about to expire');
        }

        // Si el token ya expiró
        if (decoded.exp < currentTime) {
          localStorage.clear();
          showErrorMessage('Session expired', 'Your sessionhas expired, please log in again');
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error verifying token expiration:', error);
        localStorage.clear();
        navigate('/', { replace: true });
      }
    };

    // Verificar al montar el componente
    checkTokenExpiration();

    // Verificar cada 15 segundos
    const interval = setInterval(checkTokenExpiration, 15000);

    return () => clearInterval(interval);
  }, [navigate]);

  return <>{children}</>;
};

export default TokenExpirationGuard;