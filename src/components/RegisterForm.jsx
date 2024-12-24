// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    direccion: '',
    fecha_nac: '',
    password: ''
  });
  const [error, setError] = useState(null); // Cambiado a null para manejar diferentes mensajes de error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "email") {
      setError(null); // Reinicia el error al cambiar el email
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await userApi.post('/usuarios/crear', formData);
  
      if (response.status === 200) {
        console.log('Usuario creado:', response.data);
        navigate('/login'); // Redirige al login si la creación es exitosa
      } else if (response.status === 400) {
        setError(response.data.message || 'Error: el email o el DNI ya está registrado.');
        console.log('Error al crear usuario:', response.data.message);
        alert(response.data.message || 'Error: el email o el DNI ya está registrado.');
      } else {
        console.error('Error inesperado al crear usuario:', response);
        alert('Hubo un error inesperado al crear el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un problema con la conexión. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Únete a BPC</h2>
      <p style={styles.subheading}>Regístrate y descubre todos los beneficios de ser parte de BPC.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Apellido:
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Tu apellido" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Correo Electrónico:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="ejemplo@correo.com" 
            style={{ 
              ...styles.input, 
              ...(error ? styles.inputError : {}), 
              ...(error ? styles.shakeAnimation : {}) 
            }}
            required 
          />
        </label>
        <label style={styles.label}>
          Teléfono:
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Número de teléfono" style={styles.input} required />
        </label>
        <label style={styles.label}>
          DNI:
          <input type="text" name="dni" value={formData.dni} onChange={handleChange} placeholder="DNI" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" style={styles.input} required />
        </label>
        <label style={styles.label}>
          Fecha de Nacimiento:
          <input type="date" name="fecha_nac" value={formData.fecha_nac} onChange={handleChange} style={styles.input} required />
        </label>
        <label style={styles.label}>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" style={styles.input} required />
        </label>
        {error && <p style={{ color: '#D32F2F', fontSize: '0.9em' }}>{error}</p>}
        <button type="submit" style={styles.button}>Crear Cuenta</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '450px',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.8em',
    color: '#D32F2F',
    marginBottom: '10px',
    fontWeight: '600',
  },
  subheading: {
    fontSize: '1em',
    color: '#666666',
    marginBottom: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '0.9em',
    color: '#333333',
    textAlign: 'left',
    fontWeight: '500',
    marginBottom: '5px',
  },
  input: {
    padding: '12px',
    border: '1px solid #cccccc',
    borderRadius: '6px',
    fontSize: '1em',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#ffe6e6',
  },
  shakeAnimation: {
    animation: 'shake 0.5s ease',
    animationIterationCount: 1,
  },
  button: {
    padding: '12px',
    backgroundColor: '#D32F2F',
    color: 'white',
    fontSize: '1.1em',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  '@keyframes shake': {
    '0%, 100%': { transform: 'translateX(0)' },
    '20%, 60%': { transform: 'translateX(-5px)' },
    '40%, 80%': { transform: 'translateX(5px)' },
  }
};

export default RegisterForm;