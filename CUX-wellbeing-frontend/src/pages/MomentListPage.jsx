// src/pages/MomentListPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllMoments, deleteMoment } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MomentListPage = () => {
  const [moments, setMoments] = useState([]);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      const response = await getAllMoments();
      setMoments(response.data);
    } catch (error) {
      console.log("Error al obtener los momentos: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMoment(id);
      toast.success('Micro-momento eliminado correctamente');
      setSelectedMoment(null); // Cierra el modal
      fetchMoments(); // Actualiza la lista despues de eliminar
    } catch (error) {
      console.error('Error al eliminar micro-momento:', error);
      toast.error('Error al eliminar micro-momento');
    }
  };

  const handleConfirmDelete = (moment) => {
    setSelectedMoment(moment); 
  };

  const handleCancelDelete = () => {
    setSelectedMoment(null); 
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container' style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Lista de Micro-Momentos</h2>
        {moments.length === 0 ? (
          <h2>No hay micro-momentos disponibles.</h2>
        ) : (
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {moments.map((moment, index) => (
                <tr key={moment._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{moment.type}</td>
                  <td>{moment.description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleConfirmDelete(moment)}
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

        {/* Modal de Confirmacion */}
        {selectedMoment && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Eliminación</h5>
                  <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que deseas eliminar el micro-momento {selectedMoment.type}?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedMoment._id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomentListPage;
