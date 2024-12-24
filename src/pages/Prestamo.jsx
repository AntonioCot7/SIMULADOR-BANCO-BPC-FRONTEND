import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SolicitarPrestamoForm from '../components/SolicitarPrestamoForm';
import ListaSolicitudPrestamo from '../components/ListaSolicitudPrestamo'; // Importa el nuevo componente
import { userApi } from '../api';

const SolicitudPrestamo = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const storedUsuarioId = localStorage.getItem('usuario_id');
        if (!storedUsuarioId) {
          console.error('No se encontró el usuario_id en localStorage');
          return;
        }
        setUsuarioId(storedUsuarioId);

        // Obtener el nombre del usuario desde la API
        const userResponse = await userApi.post('/usuarios/buscar', { usuario_id: storedUsuarioId });
        const { nombre } = userResponse.data.body;
        setUserName(nombre);
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    fetchUsuarioData();
  }, []);

  return (
    <div>
      <Header userName={userName} />
      <div style={styles.container}>
        <h1 style={styles.title}>Solicitud de Préstamo</h1>
        <p style={styles.description}>Completa el formulario para realizar tu solicitud de préstamo.</p>
        {usuarioId ? (
          <>
            <SolicitarPrestamoForm usuarioId={usuarioId} />
            <ListaSolicitudPrestamo usuarioId={usuarioId} /> {/* Agrega la lista de solicitudes */}
          </>
        ) : (
          <p style={styles.error}>Error: No se encontró un usuario válido para enviar la solicitud.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    margin: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#D32F2F',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#333333',
    marginBottom: '20px',
  },
  error: {
    fontSize: '1rem',
    color: '#D32F2F',
  },
};

export default SolicitudPrestamo;