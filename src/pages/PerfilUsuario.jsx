import React, { useState, useEffect } from 'react';
import { userApi } from '../api';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    direccion: '',
    fecha_nac: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usuario_id = localStorage.getItem('usuario_id');
        if (!usuario_id) {
          setError('Usuario no encontrado');
          return;
        }

        const response = await userApi.post('/usuarios/buscar', { usuario_id });
        const { body } = response.data;
        setUserData(body);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        setError('No se pudieron cargar los datos.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario_id = localStorage.getItem('usuario_id');
      const payload = { usuario_id, ...userData };

      await userApi.put('/usuarios/modificar', payload);
      navigate('/interfaceuser'); // Redirigir al dashboard
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      setError('Error al actualizar los datos.');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?');
    if (confirm) {
      try {
        const usuario_id = localStorage.getItem('usuario_id');
        await userApi.delete('/usuarios/eliminar', { data: { usuario_id } });
        alert('Cuenta eliminada con éxito.');
        localStorage.removeItem('usuario_id');
        navigate('/login'); // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        setError('Error al eliminar la cuenta.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Perfil</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.keys(userData).map((field) => (
          field !== 'usuario_id' && (
            <label key={field} style={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </label>
          )
        ))}
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            Actualizar
          </button>
          <button type="button" onClick={handleDelete} style={styles.deleteButton}>
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '100px',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#D32F2F',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default PerfilUsuario;