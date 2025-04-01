import React, { useState, useEffect } from "react";
import Navbar from "../../../layouts/AdminNavbar/Navbar";
import Sidebar from "../../../layouts/AdminSidebar/Sidebar";
import AdminTable from "./components/AdminTable/AdminTable";
import AdminChatWindow from "../../../uicomponents/ChatWindow/AdminChatWindow";
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
    // estado para el tipo de mascota seleccionado
    const [selectedPetType, setSelectedPetType] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    // Función para manejar el botón de chat
    const toggleChat = () => {
        setShowChat(!showChat);
    };

    // Función para manejar el cambio de tipo seleccionado
    const handlePetTypeChange = (petType) => {
        setSelectedPetType(petType);
    };

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 1000);
        }, 4000);

        return () => clearInterval(blinkInterval);
    }, []);

    // Effect to handle initial load and stored pet type
    useEffect(() => {
        const storedPetType = localStorage.getItem('selectedAdminPetType');

        if (storedPetType) {
            // Specifically handle 'all' case for All Pets
            if (storedPetType === 'all') {
                setSelectedPetType(null);
            } else {
                setSelectedPetType(storedPetType);
            }
            // Clear the stored pet type after using it
            localStorage.removeItem('selectedAdminPetType');
        }
    }, []);

    return (
        <div className="admindash-layout">
            <Navbar />
            <Sidebar onPetTypeSelect={handlePetTypeChange} selectedType={selectedPetType} />
            <div className="admindash-content">
                <AdminTable selectedPetType={selectedPetType} />
            </div>
            {/* Botón flotante para abrir el chat */}
            {localStorage.getItem("role") === "admin" && (
                <div className={`chat-button ${isBlinking ? 'blink' : ''}`} onClick={toggleChat}>
                    <div className="chat-icon-container">
                        <span className="chat-icon">💬</span>
                    </div>
                    <span className="chat-tooltip">Chat with adopters</span>
                </div>
            )}

            {/* Ventana de chat */}
            {showChat && <AdminChatWindow onClose={() => setShowChat(false)} />}
        </div>
    );
}

export default AdminDashboardPage;