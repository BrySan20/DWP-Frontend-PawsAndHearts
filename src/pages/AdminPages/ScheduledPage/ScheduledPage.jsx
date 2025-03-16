import React from "react";
import Navbar from "../../../layouts/AdminNavbar/Navbar";
import Sidebar from "../../../layouts/AdminSidebar/Sidebar";
import ScheduledTable from "./components/ScheduledTable/ScheduledTable";
import "./ScheduledPage.css";

const ScheduledPage = () => {
    return (
        <div className="scheduled-layout">
        <Navbar />
        <Sidebar />
        <div className="scheduled-content">
            <ScheduledTable />
        </div>
    </div>
    );
}

export default ScheduledPage;