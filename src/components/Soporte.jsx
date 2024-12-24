import React, { useState } from 'react';
import { supportApi } from '../api';

function Soporte() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtener el usuario_id del localStorage
      const usuario_id = localStorage.getItem('usuario_id');
      if (!usuario_id) {
        throw new Error('Usuario no autenticado');
      }

      // Validar que los campos no estén vacíos
      if (!titulo.trim() || !descripcion.trim()) {
        throw new Error('El título y la descripción son obligatorios.');
      }

      // Crear el payload con el formato esperado
      const payload = {
        usuario_id,
        Titulo: titulo.trim(), // Asegúrate de usar "Titulo" con T mayúscula
        descripcion: descripcion.trim(),
      };

      // Mostrar en la consola el JSON que se enviará
      console.log('Payload enviado:', JSON.stringify(payload, null, 2));

      // Enviar la solicitud POST al backend
      const response = await supportApi.post('/soporte/crear', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mostrar el resultado en la consola
      console.log('Respuesta del servidor:', response.data);

      // Mostrar un mensaje de éxito al usuario
      setMensaje('Solicitud creada exitosamente: ' + response.data.ticket_id);
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        console.error('Error en el servidor:', error.response.data);
        setMensaje(
          'Error en el servidor: ' + (error.response.data.error || 'Solicitud fallida.')
        );
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        setMensaje('Error: No se recibió respuesta del servidor.');
      } else {
        console.error('Error desconocido al crear la solicitud:', error.message);
        setMensaje(error.message || 'Hubo un error desconocido.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Soporte Técnico</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Escribe el título de tu solicitud"
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe tu problema"
            style={styles.textarea}
            required
          ></textarea>
        </label>
        <button type="submit" style={styles.button}>
          Enviar Solicitud
        </button>
      </form>
      {mensaje && <p style={styles.message}>{mensaje}</p>}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.5em',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '0.9em',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    minHeight: '80px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1976D2',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    marginTop: '15px',
    fontSize: '0.9em',
    color: mensaje.includes('Error') ? 'red' : 'green',
    textAlign: 'center',
  },
};

export default Soporte;
