import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { showErrorMessage } from './alertMessages';

/**
 * Componente que verifica el token y el rol del usuario
 * Si el token no es válido o el rol no es el correcto, redirige al login
 */
const RoleGuard = ({ element, allowedRoles }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setIsAuthorized(false);
                    showErrorMessage('You are not logged in', 'You must log in to access this page');
                    return;
                }

                // Decodificar token para obtener el rol
                const decoded = jwtDecode(token);
                const userRole = localStorage.getItem('role');

                // Verificar que el rol almacenado coincida con el del token
                if (decoded.role !== userRole) {
                    setIsAuthorized(false);
                    showErrorMessage('Authentication error', 'Invalid credentials');
                    localStorage.clear();
                    return;
                }

                // Verificar si el rol está permitido para esta ruta
                if (allowedRoles && !allowedRoles.includes(userRole)) {
                    setIsAuthorized(false);
                    showErrorMessage('Access denied', 'You do not have permission to access this page');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Error verifying authentication:', error);
                setIsAuthorized(false);
                showErrorMessage('Authentication error', 'Please Log in again');
                localStorage.clear();
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [location.pathname, allowedRoles]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return isAuthorized ? element : <Navigate to="/" replace />;
};

export default RoleGuard;