// DWP-Frontend-PawsAndHearts/src/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import AdminDashboardPage from './pages/AdminPages/AdminDashboardPage/AdminDashboardPage';
import ScheduledPage from './pages/AdminPages/ScheduledPage/ScheduledPage';
import CompletedPage from './pages/AdminPages/CompletedPage/CompletedPage';

// Guards para proteger las rutas
import RoleGuard from './guard/RoleGuard';
import TokenExpirationGuard from './guard/TokenExpirationGuard';
import RouteChangeGuard from './guard/RouteChangeGuard';

const AppRoutes = () => {
  return (
    <Router>
      <TokenExpirationGuard>
        <RouteChangeGuard />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas de adopter */}
          <Route
            path="/dashboard"
            element={<RoleGuard element={<DashboardPage />} allowedRoles={['adopter']} />}
          />
          <Route
            path="/contact"
            element={<RoleGuard element={<ContactPage />} allowedRoles={['adopter']} />}
          />
          <Route
            path="/profile"
            element={<RoleGuard element={<ProfilePage />} allowedRoles={['adopter']} />}
          />
          <Route
            path="/details/:petId"
            element={<RoleGuard element={<DetailsPage />} allowedRoles={['adopter']} />}
          />

          {/* Rutas de admin */}
          <Route
            path="/admindashboard"
            element={<RoleGuard element={<AdminDashboardPage />} allowedRoles={['admin']} />}
          />
          <Route
            path="/scheduled"
            element={<RoleGuard element={<ScheduledPage />} allowedRoles={['admin']} />}
          />
          <Route
            path="/completed"
            element={<RoleGuard element={<CompletedPage />} allowedRoles={['admin']} />}
          />

          {/* Ruta para 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </TokenExpirationGuard>
    </Router>
  );
};

export default AppRoutes;