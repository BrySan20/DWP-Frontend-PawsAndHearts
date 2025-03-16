import React from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import "./DetailsPage.css";

const DetailsPage = () => {
    return (
        <div className="details-layout">
            <Navbar />
            <Sidebar />
            <div className="details-content">
                <Details />
            </div>
        </div>
    );
}

export default DetailsPage;