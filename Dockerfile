# --- ETAPA 1: Construcción (Build) ---
FROM node:18-alpine AS builder
WORKDIR /app

# Define el argumento que recibirá la URL del backend
ARG VITE_API_URL

# Expone el argumento como una variable de entorno para que Vite lo use
ENV VITE_API_URL=${VITE_API_URL}

# Copia los archivos de dependencias e instala
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Ejecuta el script de build (Vite usará VITE_API_URL)
RUN npm run build

# --- ETAPA 2: Servidor (Serve) ---
FROM nginx:alpine

# Copia los archivos estáticos construidos de la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx para que funcione React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf