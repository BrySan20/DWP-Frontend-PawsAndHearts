import React from "react";
import Navbar from "../../../layouts/AdminNavbar/Navbar";
import Sidebar from "../../../layouts/AdminSidebar/Sidebar";
import CompletedTable from "./components/CompletedTable/CompletedTable";
import "./CompletedPage.css";

const CompletedPage = () => {
    return (
        <div className="completed-layout">
        <Navbar />
        <Sidebar />
        <div className="completed-content">
            <CompletedTable />
        </div>
    </div>
    );
}

export default CompletedPage;