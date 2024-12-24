import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.post('/usuarios/login', formData);
      console.log('Respuesta completa del servidor (Login):', response.data);

      const { usuario_id } = response.data.body;

      if (!usuario_id) {
        setError('Usuario o contraseña incorrectos');
        return;
      }

      localStorage.setItem('usuario_id', usuario_id);
      console.log('usuario_id guardado:', usuario_id);

      navigate('/interfaceuser');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión: Verifique sus credenciales.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Inicia sesión en BPC</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            style={styles.input}
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.5em',
    color: '#333333',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '0.85em',
    color: '#333333',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '0.95em',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px 0',
    backgroundColor: '#D32F2F',
    color: 'white',
    fontSize: '1em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default LoginForm;