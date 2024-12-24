import React, { useEffect, useState } from 'react';
import { prestamoApi } from '../api';

const PrestamosHistory = ({ usuarioId }) => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await prestamoApi.post('/prestamo/listar-usuario', { usuario_id: usuarioId });
        setPrestamos(response.data.body.prestamos);
      } catch (error) {
        console.error('Error al obtener los préstamos:', error);
      }
    };

    if (usuarioId) {
      fetchPrestamos();
    }
  }, [usuarioId]);

  const prestamosContainerStyle = {
    background: 'white',
    borderRadius: '5px', // Menos redondeado para un diseño más cuadrado
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: '#000',
    width: '90%',
    marginLeft: '0',
  };

  const prestamoItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
  };

  const descriptionStyle = {
    fontWeight: 'bold',
    margin: 0,
  };

  const amountStyle = {
    fontWeight: 'bold',
    margin: 0,
    color: '#F57C00',
  };

  const dateStyle = {
    fontWeight: 'bold',
    margin: 0,
    color: '#555',
  };

  const statusStyle = {
    fontWeight: 'bold',
    margin: 0,
    fontStyle: 'italic',
    color: '#555',
  };

  return (
    <div>
      {prestamos && prestamos.length > 0 ? ( // Verifica si 'prestamos' es un array y no está vacío
        prestamos.map((prestamo, index) => (
          <div key={index} style={prestamosContainerStyle}>
            <div style={prestamoItemStyle}>
              <div style={titleContainerStyle}>
                <img
                  src="/src/assets/history-icon.png"
                  alt="Loan"
                  style={iconStyle}
                />
                <span style={titleStyle}>Descripción: {prestamo.descripcion}</span>
              </div>
              <p style={descriptionStyle}>Cuenta asociada: {prestamo.cuenta_id}</p>
              <p style={amountStyle}>Monto: S/ {prestamo.monto.toFixed(2)}</p>
              <p style={dateStyle}>Fecha de creación: {new Date(prestamo.fecha_creacion).toLocaleString()}</p>
              <p style={statusStyle}>Estado: {prestamo.estado}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay préstamos disponibles.</p> // Mensaje si no hay préstamos
      )}
    </div>
  );
};

export default PrestamosHistory;