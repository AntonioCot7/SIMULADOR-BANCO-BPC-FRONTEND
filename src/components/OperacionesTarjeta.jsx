import React, { useState } from 'react';
import iconRecargar from '../assets/icon1.png';
import iconRetirar from '../assets/icon2.png';
import iconEliminar from '../assets/image37.png';
import iconNueva from '../assets/image 38.png';
import { tarjetaApi } from '../api';

const OperacionesTarjeta = ({ tarjetas, cuentaId, usuarioId, onUpdate }) => {
  const [selectedCard, setSelectedCard] = useState(''); // Tarjeta seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [actionType, setActionType] = useState(''); // Recargar o Retirar
  const [monto, setMonto] = useState(''); // Monto ingresado
  const [isWarningModal, setIsWarningModal] = useState(false); // Modal de advertencia para eliminar tarjeta

  const openModal = (type) => {
    if (!selectedCard) {
      alert("Por favor, selecciona una tarjeta antes de realizar esta acción.");
      return;
    }
    setActionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMonto('');
  };

  const handleAction = async () => {
    if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    try {
      const endpoint = actionType === 'Recargar' ? '/tarjetas/recargar' : '/tarjetas/retirar';
      await tarjetaApi.post(endpoint, {
        usuario_id: usuarioId,
        cuenta_id: cuentaId,
        tarjeta_id: selectedCard,
        monto: parseFloat(monto),
      });
      onUpdate();
      closeModal();
    } catch (error) {
      alert(`No se pudo completar la acción de ${actionType}.`);
    }
  };

  const handleEliminar = () => {
    if (!selectedCard) {
      alert("Por favor, selecciona una tarjeta.");
      return;
    }
    setIsWarningModal(true);
  };

  const confirmEliminar = async () => {
    try {
      await tarjetaApi.delete('/tarjetas/eliminar', {
        data: {
          usuario_id: usuarioId,
          cuenta_id: cuentaId,
          tarjeta_id: selectedCard,
        },
      });
      onUpdate();
      setSelectedCard('');
    } catch (error) {
      alert("No se pudo eliminar la tarjeta.");
    } finally {
      setIsWarningModal(false);
    }
  };

  const handleNuevaTarjeta = async () => {
    try {
      await tarjetaApi.post('/tarjetas/crear', {
        usuario_id: usuarioId,
        cuenta_id: cuentaId,
        tarjeta_datos: {
          estado: "activa", // Puedes cambiar a "bloqueada" si es necesario
        },
      });
      onUpdate();
    } catch (error) {
      alert("No se pudo crear la tarjeta. Por favor, inténtalo de nuevo.");
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginTop: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const iconStyle = {
    width: '70px',
    height: '70px',
    marginBottom: '10px',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  };

  const warningModalStyle = {
    backgroundColor: '#fef2f2',
    padding: '2rem',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(255, 0, 0, 0.3)',
    textAlign: 'center',
    color: '#d32f2f',
  };

  return (
    <div style={containerStyle}>
      <h3>Seleccionar Tarjeta</h3>
      <select
        style={selectStyle}
        value={selectedCard}
        onChange={(e) => setSelectedCard(e.target.value)}
      >
        <option value="" disabled>Selecciona una tarjeta</option>
        {tarjetas.map((tarjeta) => (
          <option key={tarjeta.tarjeta_id} value={tarjeta.tarjeta_id}>
            {tarjeta.tarjeta_id} - Saldo: S/ {tarjeta.saldo_disponible.toFixed(2)}
          </option>
        ))}
      </select>

      <div style={gridStyle}>
        <div style={buttonStyle} onClick={() => openModal('Recargar')}>
          <img src={iconRecargar} alt="Recargar Tarjeta" style={iconStyle} />
          <p>Recargar Tarjeta</p>
        </div>
        <div style={buttonStyle} onClick={() => openModal('Retirar')}>
          <img src={iconRetirar} alt="Retirar de Tarjeta" style={iconStyle} />
          <p>Retirar de Tarjeta</p>
        </div>
        <div style={buttonStyle} onClick={handleEliminar}>
          <img src={iconEliminar} alt="Eliminar Tarjeta" style={iconStyle} />
          <p>Eliminar Tarjeta</p>
        </div>
        <div style={buttonStyle} onClick={handleNuevaTarjeta}>
          <img src={iconNueva} alt="Nueva Tarjeta" style={iconStyle} />
          <p>Nueva Tarjeta</p>
        </div>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>{actionType} Tarjeta</h2>
            <p>Tarjeta Seleccionada: {selectedCard}</p>
            <input
              type="number"
              placeholder="Ingresa el monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                marginBottom: '1rem',
                width: '100%',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#1976D2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={handleAction}
              >
                Confirmar
              </button>
              <button
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isWarningModal && (
        <div style={modalOverlayStyle}>
          <div style={warningModalStyle}>
            <h2>Advertencia</h2>
            <p>¿Estás seguro de que deseas eliminar la tarjeta seleccionada?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={confirmEliminar}
              >
                Confirmar
              </button>
              <button
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#555',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsWarningModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperacionesTarjeta;