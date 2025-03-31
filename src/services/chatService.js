//DWP-Frontend-PawsAndHearts/src/services/chatService.js
import { io } from "socket.io-client";
import API from "./api";

// Singleton para la conexión Socket.io
let socket;

// Inicializar la conexión Socket.io
const initializeSocket = () => {
  if (!socket) {
    socket = io("https://dwp-backend-pawsandhearts.onrender.com");
    
    // Conectar e identificar al usuario
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    
    if (userId && role) {
      socket.emit('user-connected', { userId, role });
    }
    
    socket.on('connect', () => {
      console.log('Conectado al servidor de chat');
    });
    
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de chat');
    });
  }
  return socket;
};

// Obtener historial de chat (para adoptantes)
const getChatHistory = async () => {
  try {
    const response = await API.get("/chat/history");
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de chat:", error);
    throw error.response?.data || "Error al obtener historial de chat";
  }
};

// Obtener lista de chats para admin
const getAdminChatList = async () => {
  try {
    const response = await API.get("/chat/history");
    return response.data;
  } catch (error) {
    console.error("Error al obtener lista de chats:", error);
    throw error.response?.data || "Error al obtener lista de chats";
  }
};

// Obtener historial de chat con un adoptante específico (para admin)
const getAdopterChatHistory = async (adopterId) => {
  try {
    const response = await API.get(`/chat/history?adopterId=${adopterId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de chat:", error);
    throw error.response?.data || "Error al obtener historial de chat";
  }
};

// Seleccionar chat de un adoptante (para admin)
const selectAdopterChat = (adopterId) => {
  const socket = initializeSocket();
  socket.emit('admin-select-chat', { adopterId });
};

// Enviar mensaje
const sendMessage = (message) => {
  const socket = initializeSocket();
  return new Promise((resolve, reject) => {
    socket.emit('send-message', message);
    
    // Escuchar confirmación
    socket.once('message-sent', (response) => {
      resolve(response);
    });
    
    // Escuchar error
    socket.once('message-error', (error) => {
      reject(error);
    });
    
    // Timeout por si no hay respuesta
    setTimeout(() => {
      reject({ error: 'Tiempo de espera agotado' });
    }, 5000);
  });
};

// Escuchar nuevos mensajes
const onNewMessage = (callback) => {
  const socket = initializeSocket();
  socket.on('new-message', callback);
  return () => {
    socket.off('new-message', callback);
  };
};

// Escuchar historial de mensajes (para adoptante)
const onChatHistory = (callback) => {
  const socket = initializeSocket();
  socket.on('chat-history', callback);
  return () => {
    socket.off('chat-history', callback);
  };
};

// Escuchar lista de chats (para admin)
const onAdminChatList = (callback) => {
  const socket = initializeSocket();
  socket.on('admin-chat-list', callback);
  return () => {
    socket.off('admin-chat-list', callback);
  };
};

// Escuchar historial de chat seleccionado (para admin)
const onAdminChatHistory = (callback) => {
  const socket = initializeSocket();
  socket.on('admin-chat-history', callback);
  return () => {
    socket.off('admin-chat-history', callback);
  };
};

export {
  initializeSocket,
  getChatHistory,
  getAdminChatList,
  getAdopterChatHistory,
  selectAdopterChat,
  sendMessage,
  onNewMessage,
  onChatHistory,
  onAdminChatList,
  onAdminChatHistory
};