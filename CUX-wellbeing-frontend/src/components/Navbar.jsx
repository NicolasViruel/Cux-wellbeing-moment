
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/public/cux.avif?url';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="60" height="30" className="d-inline-block align-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Hogar</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-user" className="nav-link">Crear Usuario</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-moment" className="nav-link">Crear Micro-Momento</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">Lista de Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/assign-moment" className="nav-link">Asignar Micro-Momento</Link>
            </li>
            <li className="nav-item">
              <Link to="/moments" className="nav-link">Listar Micro-Momentos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
