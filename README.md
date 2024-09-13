# 🚀 Cux Micro-Momentos

Esta es una aplicación web que permite crear usuarios como asi tambien Micro-Momentos que son recordatorios para enviar un correo electronico a un email para recordar a los pacientes dicha descripcion.
El proyecto está dividido en dos partes principales: un backend desarrollado con NestJS que maneja la lógica de notificaciones y la persistencia de datos, y un frontend construido con React que proporciona la interfaz de usuario.

## 🗂 Estructura del Proyecto

- **`backend/`**: Contiene el código del servidor, construido con NestJS.
- **`frontend/`**: Contiene el código del cliente, construido con React.

## 🛠 Instalación

### Requisitos Previos

- **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### 1. Clonar el Repositorio


git clone 

- **cd CUX-Wellbeing-moment**


### 2.  Configurar el Backend

Navega al directorio del backend:

  - **cd ./CUX-wellbeing-backend**
Instala las dependencias:

- **npm install**:

### npm run start:dev
El servidor debería estar corriendo en el PORT que establezcas en tu archivo .env 
Agrega tus variables: 
MONDODB_URI=*************************
PORT=*****************
EMAIL_USER=*****************
EMAIL_PASS=*************

### 3.  Configurar el Frontend

Navega al directorio del frontend:

  - **cd ./CUX-wellbeing-frontend**
Instala las dependencias:

- **npm install**:

### npm run dev : Inicia la aplicación de React:

La aplicación debería abrirse automáticamente en tu navegador en http://localhost:5173.


## 🔥 Usar la Aplicación
### 📋 Probar el Backend con Postman
Para probar las rutas del backend, puedes usar Postman:


## 🎮 Usar el Frontend
Una vez que el frontend esté corriendo, puedes crear un usuario, crear un micro-momento ademas de asignarle un micro-momento a un usuario donde la app sola enviara el recordatorio.

## 🤝 Contribuir
¡Las contribuciones son bienvenidas! Si tienes alguna idea o mejora, no dudes en abrir un issue o enviar un pull request.

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo LICENSE.

¡Gracias por usar CUX-Micro-Momento! 🎉🐱‍👤
