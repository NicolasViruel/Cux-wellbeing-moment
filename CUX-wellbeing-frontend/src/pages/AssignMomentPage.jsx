import { useState, useEffect } from 'react'
import { assignMomentToUser, getAllMoments, getAllUsers } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AssignMomentPage = () => {
  const [users, setUsers] = useState([]);
  const [moments, setMoments] = useState([]);
  const [selectUser, setSelectedUser] = useState('');
  const [selectMoment, setSelectedMoment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const [userResponse, momentResponse] = await Promise.all([getAllUsers(), getAllMoments()]);
        setUsers(userResponse.data);
        setMoments(momentResponse.data);
      } catch (error) {
        console.log('Error al obtener los datos: ', error);
        
      }
    };
    fetchData()

  }, [])

  const handleAssign = async (e) =>{
    e.preventDefault();
    if (!selectUser && !selectMoment) {
      toast.error("Debe seleccionar un usuario y un momento")
      return
    }
    try {
      await assignMomentToUser(selectUser, selectMoment);
      toast.success('Micro-momento asignado Exitosamente!');
      navigate("/")
    } catch (error) {
      console.error('Error al asignar micro-momento:', error);
      toast.error('Error al asignar micro-momento. Intente nuevamente.');
    }
  }

  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className="container" style={{ maxWidth: '500px' }}>
      <h2 className='text-center mb-4'>Asignar Micro-Momento a Usuario</h2>
      <form onSubmit={handleAssign}>
        <div className="mb-3">
          <label className="form-label">Selecciona Usuario</label>
          <select className="form-select" onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">Selecciona un usuario</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Selecciona Micro-Momento</label>
          <select className="form-select" onChange={(e) => setSelectedMoment(e.target.value)} required>
            <option value="">Selecciona un micro-momento</option>
            {moments.map((moment) => (
              <option key={moment._id} value={moment._id}>
                {moment.type} - {moment.description}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">Asignar Micro-Momento</button>
        <button type="button" onClick={() => navigate(-1)} className="btn btn-danger w-100">Atrás</button>
      </form>
    </div>
    </div>
    
  )
}

export default AssignMomentPage