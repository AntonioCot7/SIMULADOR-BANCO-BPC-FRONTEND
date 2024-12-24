import React, { useEffect, useState } from 'react';
import { paymentApi } from '../api'; // Importa la API de pagos

function UsuarioPagos() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const usuario_id = localStorage.getItem('usuario_id');
        if (!usuario_id) throw new Error('Usuario no autenticado.');

        const response = await paymentApi.post('/pago/listar', { usuario_id });
        setPagos(response.data.body);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los pagos:', err);
        setError('No se pudieron cargar los pagos.');
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  if (loading) {
    return <p>Cargando pagos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h3>Historial de Pagos</h3>
      {pagos.length > 0 ? (
        pagos.map((pago) => (
          <div key={pago.id} style={styles.card}>
            <p><strong>Título:</strong> {pago.titulo}</p>
            <p><strong>Descripción:</strong> {pago.descripcion}</p>
            <p><strong>Monto:</strong> S/ {pago.monto.toFixed(2)}</p>
            <p><strong>Fecha:</strong> {new Date(pago.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> {pago.estado}</p>
          </div>
        ))
      ) : (
        <p>No tienes pagos registrados.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '15px',
    backgroundColor: '#F4F4F4',
    borderRadius: '10px',
    marginTop: '20px',
  },
  card: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default UsuarioPagos;