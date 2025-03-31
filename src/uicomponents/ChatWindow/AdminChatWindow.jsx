import React, { useState, useEffect, useRef } from "react";
import {
    initializeSocket, getAdminChatList, selectAdopterChat, sendMessage,
    onNewMessage, onAdminChatList, onAdminChatHistory
} from "../../services/chatService";
import "./AdminChatWindow.css";

const AdminChatWindow = ({ onClose }) => {
    const [adoptersList, setAdoptersList] = useState([]);
    const [selectedAdopter, setSelectedAdopter] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Datos del admin desde localStorage
    const adminId = localStorage.getItem("userId");
    const adminName = localStorage.getItem("fullName");

    // Scroll al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Cargar lista de chats
    useEffect(() => {
        const loadChatList = async () => {
            try {
                setLoading(true);
                const list = await getAdminChatList();
                setAdoptersList(list);
            } catch (error) {
                console.error("Error loading chat list:", error);
            } finally {
                setLoading(false);
            }
        };

        loadChatList();

        // Inicializar Socket.io
        initializeSocket();

        // Escuchar lista de chats
        const unsubscribeAdminChatList = onAdminChatList((list) => {
            setAdoptersList(list);
        });

        // Escuchar historial de chat seleccionado
        const unsubscribeAdminChatHistory = onAdminChatHistory((data) => {
            if (data.messages) {
                setMessages(data.messages);
            }

            if (data.adopterInfo && !selectedAdopter) {
                setSelectedAdopter(data.adopterInfo);
            }
        });

        // Escuchar nuevos mensajes
        const unsubscribeNewMessage = onNewMessage((data) => {
            // Determinar si es un mensaje directo o un objeto con información adicional
            const message = data.message || data;
            const adopterId = data.adopterId ||
                (data.senderRole === 'adopter' ? data.senderId : null) ||
                message.adopterId ||
                (message.senderRole === 'adopter' ? message.senderId : null);

            // Normalizar estructura del mensaje para evitar inconsistencias
            const normalizedMessage = {
                id: message.id || `msg-${Date.now()}`,
                message: message.message || message.text || data.text || "",
                senderId: message.senderId || data.senderId || "",
                senderName: message.senderName || data.senderName || "",
                senderRole: message.senderRole || data.senderRole || "",
                timestamp: message.timestamp || data.timestamp || new Date().toISOString(),
                adopterId: adopterId
            };

            // Actualizar mensajes si corresponde al chat actualmente seleccionado
            if (selectedAdopter && adopterId === selectedAdopter.id) {
                setMessages((prevMessages) => {
                    // Verificar si el mensaje ya existe para evitar duplicados
                    const messageExists = prevMessages.some(
                        msg => msg.id === normalizedMessage.id
                    );

                    if (!messageExists) {
                        return [...prevMessages, normalizedMessage];
                    }
                    return prevMessages;
                });
            }

            // Actualizar la lista de chats con el último mensaje
            if (adopterId) {
                setAdoptersList((prevList) => {
                    const updatedList = [...prevList];
                    const existingAdopterIndex = updatedList.findIndex(
                        (adopter) => adopter.id === adopterId
                    );

                    const lastMessage = normalizedMessage.message;
                    const timestamp = normalizedMessage.timestamp;

                    if (existingAdopterIndex !== -1) {
                        // Actualizar el adopter existente
                        updatedList[existingAdopterIndex] = {
                            ...updatedList[existingAdopterIndex],
                            lastMessage: lastMessage,
                            timestamp: timestamp
                        };
                    } else {
                        // Agregar nuevo adopter
                        updatedList.push({
                            id: adopterId,
                            name: normalizedMessage.senderName,
                            lastMessage: lastMessage,
                            timestamp: timestamp
                        });
                    }

                    return updatedList;
                });
            }
        });

        return () => {
            unsubscribeAdminChatList();
            unsubscribeAdminChatHistory();
            unsubscribeNewMessage();
        };
    }, [selectedAdopter]); // Añadimos selectedAdopter como dependencia

    // Efecto para hacer scroll al último mensaje
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Seleccionar chat de un adoptante
    const handleSelectAdopter = (adopter) => {
        setSelectedAdopter(adopter);
        selectAdopterChat(adopter.id);
        // Asegurarnos de que cualquier mensaje nuevo que llegue mientras cambiamos de chat
        // se procese correctamente
        setMessages([]); // Limpiar mensajes mientras cargamos nuevos
    };

    // Enviar mensaje
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedAdopter) return;

        try {
            const messageData = {
                text: newMessage,
                senderId: adminId,
                senderName: adminName,
                senderRole: "admin",
                adopterId: selectedAdopter.id,
                receiverId: selectedAdopter.id,
                timestamp: new Date().toISOString()
            };

            // Crear objeto de mensaje para actualización local
            const localMessage = {
                id: `temp-${Date.now()}`, // ID temporal
                message: newMessage,
                senderId: adminId,
                senderName: adminName,
                senderRole: "admin",
                timestamp: new Date().toISOString()
            };

            // Actualizar la interfaz inmediatamente
            setMessages(prevMessages => [...prevMessages, localMessage]);

            // Limpiar el campo de entrada
            setNewMessage("");

            // Actualizar también la lista de adoptantes con el último mensaje
            setAdoptersList(prevList => {
                return prevList.map(adopter => {
                    if (adopter.id === selectedAdopter.id) {
                        return {
                            ...adopter,
                            lastMessage: newMessage,
                            timestamp: new Date().toISOString()
                        };
                    }
                    return adopter;
                });
            });

            // Enviar mensaje al servidor
            await sendMessage(messageData);
        } catch (error) {
            console.error("Error sending message:", error);
            alert("The message could not be sent, please try again.");
        }
    };

    // Formatear fecha
    const formatDate = (timestamp) => {
        if (!timestamp) return "";

        const date = new Date(timestamp);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        // Mismo día
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Ayer
        if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        }

        // Otro día
        return date.toLocaleDateString();
    };

    return (
        <div className="admin-chat-window">
            <div className="chat-header">
                <h3>Chats with adopters</h3>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="admin-chat-container">
                <div className="adopters-list">
                    {loading ? (
                        <div className="loading">Loading chats...</div>
                    ) : adoptersList.length === 0 ? (
                        <div className="no-chats">No chats available</div>
                    ) : (
                        adoptersList.map((adopter) => (
                            <div
                                key={adopter.id}
                                className={`adopter-item ${selectedAdopter?.id === adopter.id ? "selected" : ""}`}
                                onClick={() => handleSelectAdopter(adopter)}
                            >
                                <div className="adopter-info">
                                    <div className="adopter-name">{adopter.name}</div>
                                    <div className="adopter-preview">
                                        {adopter.lastMessage || "No messages"}
                                    </div>
                                </div>
                                <div className="adopter-time">
                                    {formatDate(adopter.timestamp)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="chat-content">
                    {!selectedAdopter ? (
                        <div className="no-chat-selected">
                            Select a chat to view messages
                        </div>
                    ) : (
                        <>
                            <div className="chat-selected-header">
                                <button className="close-button" onClick={onClose}>×</button>
                                <h4>Chat with {selectedAdopter.name}</h4>
                            </div>

                            <div className="chat-messages">
                                {messages.length === 0 ? (
                                    <div className="no-messages">
                                        No messages. ¡Start the conversation!
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div
                                            key={msg.id || index}
                                            className={`message ${msg.senderRole === "admin" ? "my-message" : "other-message"}`}
                                        >
                                            <div className="message-sender">{msg.senderName}</div>
                                            <div className="message-text">{msg.message}</div>
                                            <div className="message-time">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form className="chat-input" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Write a message..."
                                />
                                <button type="submit">Send</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminChatWindow;