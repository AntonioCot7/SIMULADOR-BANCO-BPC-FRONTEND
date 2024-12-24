import React, { useState } from 'react';
import { solicitudPrestamoApi } from '../api'; // Ajusta la ruta según sea necesario

const SolicitarPrestamoForm = ({ usuarioId }) => {
  const [formData, setFormData] = useState({
    monto: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        usuario_id: usuarioId,
        monto: parseFloat(formData.monto), // Convertir a número
        descripcion: formData.descripcion,
      };
      const response = await solicitudPrestamoApi.post('/solicitud-prestamo/crear', payload);
      console.log('Solicitud enviada:', response.data);
      
      
      // Recargar la página para mostrar la nueva solicitud
      window.location.reload(); // Recarga la página
    } catch (error) {
      console.error('Error al enviar la solicitud de préstamo:', error);
      alert('Ocurrió un error al enviar la solicitud');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label htmlFor="monto" style={styles.label}>Monto del préstamo:</label>
        <input
          type="number"
          id="monto"
          name="monto"
          value={formData.monto}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="descripcion" style={styles.label}>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          style={styles.textarea}
          required
        ></textarea>
      </div>
      <button type="submit" style={styles.button}>Enviar Solicitud</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  formGroup: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '5px',
    color: '#333333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '80px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#FFFFFF',
    backgroundColor: '#D32F2F',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default SolicitarPrestamoForm;