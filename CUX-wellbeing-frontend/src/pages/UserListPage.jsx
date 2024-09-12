import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserListPage = () => {
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log("Error al obtener los usuarios: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success('Usuario eliminado correctamente');
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error al eliminar usuario');
    }
  };

  const handleConfirmDelete = (user) => {
    setSelectedUser(user); // guarda el usuario seleccionado
  };

  const handleCancelDelete = () => {
    setSelectedUser(null); // resetea el usuario seleccionado
  };
  
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container' style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      {users.length === 0 ? (
        <h2>No hay usuarios disponibles.</h2>
      ): (
        <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                  <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleConfirmDelete(user)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
      <button type="button" onClick={() => navigate(-1)} className="btn btn-danger w-100 mt-4">Atrás</button>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

{/* Modal para confirmar la eliminacion */}
{selectedUser && (
  <div className="modal show" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmar Eliminación</h5>
          <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
        </div>
        <div className="modal-body">
          <p>¿Estás seguro de que deseas eliminar al usuario {selectedUser.name}?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedUser._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
    </div>
    
  )
}

export default UserListPage