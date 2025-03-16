import React from "react";
import Navbar from "../../../layouts/AdminNavbar/Navbar";
import Sidebar from "../../../layouts/AdminSidebar/Sidebar";
import AdminTable from "./components/AdminTable/AdminTable";
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
    return (
        <div className="admindash-layout">
        <Navbar />
        <Sidebar />
        <div className="admindash-content">
            <AdminTable />
        </div>
    </div>
    );
}

export default AdminDashboardPage;