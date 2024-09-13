import React, { useState } from "react";
import { toast } from "react-toastify";
import { createMoment } from "../services/api";
import { useNavigate } from "react-router-dom";
import wellbeing from '../assets/wellbeing.webp';

const CreateMomentPage = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const utcDate = new Date(scheduledAt); // Convierte automáticamente a UTC

      await createMoment({
        type,
        description,
        scheduledAt: utcDate.toISOString(),
      });

      toast.success("Micro-momento creado exitosamente!");
      setType("");
      setDescription("");
      setScheduledAt("");
      navigate("/");
    } catch (error) {
      console.log("Error al crear el Micro-momento: ", error);
      toast.error("Error al crear el micro-momento. Intente nuevamente.");
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center vh-100 p-5">
      {/* Formulario de creación de micro-momento */}
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Crear un nuevo Micro-Momento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <input
              type="text"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha y Hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Crear Micro-Momento
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-danger w-100"
          >
            Atrás
          </button>
        </form>
      </div>
      
      {/* Imagen al lado derecho */}
      <div>
        <img src={wellbeing} alt="Bienestar" className="img-fluid" style={{ maxWidth: '400px', borderRadius: '8px' }} />
      </div>
    </div>
  );
};

export default CreateMomentPage;

