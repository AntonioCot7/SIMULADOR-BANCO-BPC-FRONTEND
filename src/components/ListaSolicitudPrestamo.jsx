import React, { useState, useEffect } from 'react';
import { solicitudPrestamoApi } from '../api'; // Asegúrate de tener la API configurada correctamente

const ListaSolicitudPrestamo = ({ usuarioId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await solicitudPrestamoApi.post('/solicitud-prestamo/listar', { usuario_id: usuarioId });
        if (response.data && response.data.body && Array.isArray(response.data.body.items)) {
          setSolicitudes(response.data.body.items); // Asegúrate de que sean los datos correctos
        } else {
          console.error('Estructura inesperada de la API:', response.data);
          setError('No se pudieron obtener las solicitudes.');
        }
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    if (usuarioId) {
      fetchSolicitudes();
    }
  }, [usuarioId]);

  if (loading) {
    return <p>Cargando solicitudes...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitudes de Préstamo</h2>
      {solicitudes.length > 0 ? (
        <ul style={styles.list}>
          {solicitudes.map((solicitud) => (
            <li key={solicitud.solicitud_id} style={styles.listItem}>
              <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
              <p><strong>Monto:</strong> S/ {solicitud.monto}</p>
              <p><strong>Estado:</strong> {solicitud.estado}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(solicitud.fecha_creacion).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noData}>No se encontraron solicitudes de préstamo.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    color: '#D32F2F',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
  },
  noData: {
    fontSize: '1rem',
    color: '#555',
  },
  error: {
    fontSize: '1rem',
    color: 'red',
  },
};

export default ListaSolicitudPrestamo;