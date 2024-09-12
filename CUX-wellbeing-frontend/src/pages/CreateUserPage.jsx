import React, { useState } from 'react';
import { createUser } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email, password });
      toast.success('Usuario creado exitosamente!');
      setName('');
      setEmail('');
      setPassword('');
      navigate("/")
    } catch (error) {
      console.error('Error al crear usuario:', error);
      toast.error('Error al crear usuario. Intente de nuevo.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">Crear Usuario</button>
        <button type="button" onClick={() => navigate(-1)} className="btn btn-danger w-100">Atrás</button>
      </form>
    </div>
    </div>
    
  )
}

export default CreateUserPage