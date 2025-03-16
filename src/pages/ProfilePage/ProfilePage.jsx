import React from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-layout">
            <Navbar />
            <Sidebar />
            <div className="profile-content">
                <Profile />
            </div>
        </div>
    );
}

export default ProfilePage;