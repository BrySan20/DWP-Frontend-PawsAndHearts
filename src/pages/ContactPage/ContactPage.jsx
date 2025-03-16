import React from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import ContactContent from "./components/ContactContent/ContactContent";
import "./ContactPage.css";

const ContactPage = () => {
    return (
        <div className="contact-layout">
            <Navbar />
            <Sidebar />
            <div className="contact-content">
                <ContactContent />
            </div>
        </div>
    );
}

export default ContactPage;