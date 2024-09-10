import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/api';

const UserListPage = () => {
  
  const [user, setUser] = useState([]);

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
    <div className='container'>
      <h2>Lista de Usuarios</h2>
      {user.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ): (
        <ul className='list-group'>
          {user.map((user) =>(
            <li key={user.id} className='list-group-item'>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserListPage