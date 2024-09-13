import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='text-center'>
      <h1>Bienvenido a CUX</h1>
      <h2>Micro-Momentos de Bienestar</h2>
      <p>Seleccione una opcion para continuar:</p>
      <Link to="/create-user" className="btn btn-pink m-2  ">Crear Usuario</Link>
      <Link to="/create-moment" className="btn btn-pink m-2 ">Crear Micro-Momento</Link>
      <Link to="/users" className="btn btn-pink m-2 ">Lista de Usuarios</Link>
      <Link to="/assign-moment" className="btn btn-pink m-2  ">Asignar Micro-Momento</Link>
      <Link to="/moments" className="btn btn-pink m-2  ">Listar Micro-Momentos</Link>
    </div>
    </div>
    
  )
}

export default HomePage