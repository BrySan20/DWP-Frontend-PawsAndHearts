import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/admindashboard" element={<AdminDashboardPage />} />
        <Route path="/scheduled" element={<ScheduledPage />} />
        <Route path="/completed" element={<CompletedPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
