import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import Carousel from "./components/Carousel/Carousel";
import CardGrid from "./components/CardGrid/CardGrid";
import Footer from "../../layouts/Footer/Footer";
import ChatWindow from "../../uicomponents/ChatWindow/ChatWindow";
import "./DashboardPage.css";

const DashboardPage = () => {
    const [selectedPetType, setSelectedPetType] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);
    const [searchFilters, setSearchFilters] = useState(null);
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const handlePetTypeChange = (petType) => {
        setShowFavorites(false);
        setSelectedPetType(petType);
        setSearchFilters(null);
    };

    const handleFavoritesToggle = () => {
        setShowFavorites(!showFavorites);
        setSelectedPetType(null);
        setSearchFilters(null);
    };

    useEffect(() => {
        const handlePetSearch = () => {
            const storedFilters = localStorage.getItem('searchFilters');
            if (storedFilters) {
                const parsedFilters = JSON.parse(storedFilters);
                setSearchFilters(parsedFilters);
                localStorage.removeItem('searchFilters');
            }
        };

        const storedPetType = localStorage.getItem('selectedPetType');
        const storedFavorites = localStorage.getItem('showFavorites');

        if (storedPetType) {
            if (storedPetType === 'all') {
                setSelectedPetType(null);
            } else {
                setSelectedPetType(storedPetType);
            }
            localStorage.removeItem('selectedPetType');
        }

        if (storedFavorites === 'true') {
            setShowFavorites(true);
            localStorage.removeItem('showFavorites');
        }

        window.addEventListener('pet-search', handlePetSearch);

        return () => {
            window.removeEventListener('pet-search', handlePetSearch);
        };
    }, []);

    return (
        <div className="dashboard-layout">
            <Navbar
                onSearchFilters={(filters) => {
                    localStorage.setItem('searchFilters', JSON.stringify(filters));
                    window.dispatchEvent(new Event('pet-search'));
                }}
            />
            <Sidebar
                onPetTypeSelect={handlePetTypeChange}
                selectedType={selectedPetType}
                onFavoritesToggle={handleFavoritesToggle}
                isFavoritesActive={showFavorites}
            />
            <div className="dashboard-content">
                <Carousel />
                <CardGrid
                    selectedPetType={selectedPetType}
                    showFavorites={showFavorites}
                    searchFilters={searchFilters}
                />
                <Footer />
            </div>
            {localStorage.getItem("role") === "adopter" && (
                <div className="chat-button" onClick={toggleChat}>
                    <span className="chat-icon">💬</span>
                </div>
            )}
            {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
        </div>
    );
}

export default DashboardPage;