import React, { useState } from 'react';
import { supportApi } from '../api';

const SupportForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario_id = localStorage.getItem('usuario_id'); // Obtener el usuario_id desde localStorage

    if (!usuario_id) {
      setErrorMessage('Error: No se encontró el usuario_id.');
      return;
    }

    try {
      const response = await supportApi.post('/soporte/crear', {
        usuario_id,
        Titulo: title,
        descripcion: description,
      });

      if (response.status === 200) {
        setSuccessMessage('Solicitud enviada con éxito.');
        setTitle(''); // Limpiar el título
        setDescription(''); // Limpiar la descripción
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de soporte:', error);
      setErrorMessage('Error al enviar la solicitud. Intenta nuevamente.');
    }
  };

  const supportFormStyle = {
    position: 'fixed',
    bottom: '110px',
    right: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    padding: '1rem',
    width: '300px',
    textAlign: 'center', // Centra el contenido globalmente
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    textAlign: 'left', // Alinea las etiquetas a la izquierda
  };

  const inputStyle = {
    display: 'block',
    marginBottom: '1rem',
    width: '100%',
  };

  const buttonStyle = {
    background: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    margin: '0 auto', // Centra el botón horizontalmente
    display: 'block',
  };

  return (
    <div style={supportFormStyle}>
      <h3>Solicitud de Soporte</h3>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: '100px' }}
            required
          ></textarea>
        </label>
        <button type="submit" style={buttonStyle}>
          Enviar Solicitud
        </button>
      </form>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </div>
  );
};

export default SupportForm;
