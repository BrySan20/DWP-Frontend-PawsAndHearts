import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { showErrorAlert } from './alertMessages';

// Componente que verifica que el token y el rol corresponden al usuario que se logeó
const AuthGuard = ({ children, allowedRoles = [] }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [authError, setAuthError] = useState(null);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Primero verificamos si existe un token
        if (!token) {
          setAuthError('You are not authenticated');
          setIsChecking(false);
          return;
        }
        
        // Si hay token, verificamos si el rol es permitido (solo si se especificaron roles)
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
          setAuthError('You do not have permission to access this page');
          setIsChecking(false);
          return;
        }
        
        // Si todo está bien, continuamos
        setIsChecking(false);
      } catch (error) {
        setAuthError(error.message || 'Authentication error');
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [token, userRole, allowedRoles, location.pathname]);
  
  if (isChecking) {
    // Mientras verifica, puedes mostrar un spinner o componente de carga
    return <div>Verificando autenticación...</div>;
  }
  
  // Si hay un error de autenticación
  if (authError) {
    // Mostrar el mensaje de error correspondiente
    showErrorAlert(authError);
    
    // Limpiar localStorage solo si no está autenticado (no hay token)
    // Si el problema es de permisos, no limpiamos las credenciales
    if (authError === 'You are not authenticated') {
      localStorage.clear();
    }
    
    // Redirigir al login
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Si todo está bien, mostrar el componente hijo
  return children;
};

export default AuthGuard;