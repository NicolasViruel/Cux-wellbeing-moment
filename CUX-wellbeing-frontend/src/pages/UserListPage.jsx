import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
  
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () =>{
      try {
        const response = await getAllUsers();
        setUser(response.data);
      } catch (error) {
        console.log("Error al obtener los usuarios: ", error);
        
      }
    };

    fetchUsers();
  }, [])
  
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container' style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      {user.length === 0 ? (
        <h2>No hay usuarios disponibles.</h2>
      ): (
        
        <ul className='list-group '>
          {user.map((user) =>(
            <li key={user.id} className='list-group-item  mb-3'>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => navigate(-1)} className="btn btn-danger w-100 mt-4">Atrás</button>
    </div>
    </div>
    
  )
}

export default UserListPage