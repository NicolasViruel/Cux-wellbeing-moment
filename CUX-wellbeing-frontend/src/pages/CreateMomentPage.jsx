import React, { useState } from "react";
import { createMoment } from "../services/api";
import { toast } from 'react-toastify';

const CreateMomentPage = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleAt, setScheduleAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMoment({ type, description, scheduleAt });
      toast.success('Micro-momento creado Exitosamente!');
      setType("");
      setDescription("");
      setScheduleAt("");
    } catch (error) {
      console.log("Error al crear el Micro-momento: ", error);
    }
  };

  return (
    <div className="container">
      <h2>Crear un nuevo Micro-Momento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input type="text" className="form-control" value={type} onChange={(e) =>setType(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha y Hora</label>
          <input type="datetime-local" className="form-control" value={scheduleAt} onChange={(e) =>setScheduleAt(e.target.value)} required/>
        </div>
        <button type="submit" className="btn btn-primary">Crear Micro-Momento</button>
      </form>
    </div>
  );
};

export default CreateMomentPage;
