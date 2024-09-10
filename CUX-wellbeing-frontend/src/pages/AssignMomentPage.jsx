import { useState, useEffect } from 'react'
import { assignMomentToUser, getAllMoments, getAllUsers } from '../services/api';

const AssignMomentPage = () => {
  const [users, setUsers] = useState([]);
  const [moments, setMoments] = useState([]);
  const [selectUser, setSelectedUser] = useState('');
  const [selectMoment, setSelectedMoment] = useState('');

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
      alert('Por favor selecciona un usuario y un Micro-momento');
      return
    }
    try {
      await assignMomentToUser(selectUser, selectMoment);
    } catch (error) {
      console.error('Error al asignar micro-momento:', error);
    }
  }

  
  return (
    <div className="container">
      <h2>Asignar Micro-Momento a Usuario</h2>
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
        <button type="submit" className="btn btn-primary">Asignar Micro-Momento</button>
      </form>
    </div>
  )
}

export default AssignMomentPage