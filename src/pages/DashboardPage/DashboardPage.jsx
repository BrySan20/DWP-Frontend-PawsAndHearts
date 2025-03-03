import React from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import Carousel from "./components/Carousel/Carousel";
import CardGrid from "./components/CardGrid/CardGrid";
import Footer from "../../layouts/Footer/Footer";
import "./DashboardPage.css";

const DashboardPage = () => {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Carousel />
                <CardGrid />
                <Footer />
            </div>
        </div>
    );
}

export default DashboardPage;