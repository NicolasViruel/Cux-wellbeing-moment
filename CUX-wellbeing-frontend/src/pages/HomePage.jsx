import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/imagenhombre.webp';

const HomePage = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center vh-100'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5%',
      }}
    >
      {/* Contenedor principal con texto y botones */}
      <div className='text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#ff69b4' }}>¡Bienvenido a CUX!</h1>
        <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#ff1493' }}>Tu Compañero en Micro-Momentos de Bienestar</h2>
        <p className="mb-4" style={{ color: '#333' }}>Seleccione una opción para mejorar tu día:</p>
        <Link to="/create-user" className="btn btn-pink m-2">Crear Usuario</Link>
        <Link to="/create-moment" className="btn btn-pink m-2">Crear Micro-Momento</Link>
        <Link to="/users" className="btn btn-pink m-2">Lista de Usuarios</Link>
        <Link to="/assign-moment" className="btn btn-pink m-2">Asignar Micro-Momento</Link>
        <Link to="/moments" className="btn btn-pink m-2">Listar Micro-Momentos</Link>
      </div>
    </div>
  );
}

export default HomePage;

