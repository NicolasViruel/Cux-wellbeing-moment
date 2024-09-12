import React, { useState } from "react";
import { createMoment } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateMomentPage = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asume que 'scheduledAt' es la fecha en la zona horaria local
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
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container " style={{ maxWidth: "500px" }}>
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
    </div>
  );
};

export default CreateMomentPage;
