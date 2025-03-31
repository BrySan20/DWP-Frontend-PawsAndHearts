// DWP-Frontend-PawsAndHearts/src/uicomponents/ChatWindow/ChatWindow.jsx
import React, { useState, useEffect, useRef } from "react";
import { initializeSocket, getChatHistory, sendMessage, onNewMessage, onChatHistory } from "../../services/chatService";
import "./ChatWindow.css";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState({ id: "admin", name: "Administrador" });
  const messagesEndRef = useRef(null);

  // Datos del usuario desde localStorage
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("fullName");
  const userRole = localStorage.getItem("role");

  // Scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Cargar historial de mensajes
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setLoading(true);
        const history = await getChatHistory();
        setMessages(history);
      } catch (error) {
        console.error("Error loading history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();

    // Inicializar Socket.io
    initializeSocket();

    // Escuchar nuevos mensajes
    const unsubscribeNewMessage = onNewMessage((msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Escuchar historial de mensajes
    const unsubscribeChatHistory = onChatHistory((data) => {
      if (data.messages) {
        setMessages(data.messages);
      }

      if (data.adminInfo) {
        setAdminInfo(data.adminInfo);
      }
    });

    return () => {
      unsubscribeNewMessage();
      unsubscribeChatHistory();
    };
  }, []);

  // Scroll al último mensaje cuando se actualiza la lista
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        text: newMessage,
        senderId: userId,
        senderName: userName,
        senderRole: userRole,
        adopterId: userId,
        receiverId: adminInfo.id,
        timestamp: new Date().toISOString()
      };

      // Crear objeto de mensaje para actualización local
      const localMessage = {
        id: `temp-${Date.now()}`, // ID temporal
        message: newMessage,
        senderId: userId,
        senderName: userName,
        timestamp: new Date().toISOString()
      };

      // Actualizar la interfaz inmediatamente
      setMessages(prevMessages => [...prevMessages, localMessage]);

      // Limpiar el campo de entrada
      setNewMessage("");

      // Enviar mensaje al servidor
      await sendMessage(messageData);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("The message cannot be sent, please try again.");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat with {adminInfo.name}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="chat-messages">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            No messages. ¡Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`message ${msg.senderId === userId ? "my-message" : "other-message"}`}
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
    </div>
  );
};

export default ChatWindow;