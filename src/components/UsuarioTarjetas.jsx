import React, { useState } from 'react';
import { cardApi } from '../api'; // Importamos la API configurada

function UsuarioTarjetas({ tarjetas }) {
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // "recargar" o "retirar"
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState('');

  const openModal = (action, card) => {
    setModalAction(action);
    setSelectedCard(card);
    setAmount('');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  const handleSubmit = async () => {
    try {
      const usuarioId = localStorage.getItem('usuario_id');
      if (!amount || isNaN(amount) || amount <= 0) {
        alert('Monto inválido. Inténtalo nuevamente.');
        return;
      }

      const payload = {
        usuario_id: usuarioId,
        cuenta_id: selectedCard.cuenta_id,
        tarjeta_id: selectedCard.tarjeta_id,
        monto: parseFloat(amount),
      };

      const endpoint = modalAction === 'recargar' ? '/tarjetas/recargar' : '/tarjetas/retirar';
      const response = await cardApi.post(endpoint, payload);

      alert(
        modalAction === 'recargar'
          ? `Tarjeta recargada exitosamente: ${response.data.body}`
          : `Monto retirado exitosamente: ${response.data.body}`
      );
      handleModalClose();
    } catch (error) {
      console.error('Error en la operación:', error);
      alert('No se pudo completar la operación. Inténtalo nuevamente.');
    }
  };

  return (
    <div style={styles.cardsContainer}>
      <h3 style={styles.sectionTitle}>Tarjetas asociadas</h3>
      {tarjetas && tarjetas.length > 0 ? (
        tarjetas.map((card) => (
          <div key={card.tarjeta_id} style={styles.cardItem}>
            <p><strong>Número de Tarjeta:</strong> {card.tarjeta_id}</p>
            <p><strong>Saldo Disponible:</strong> S/ {card.saldo_disponible.toFixed(2)}</p>
            <p><strong>Estado:</strong> {card.estado}</p>
            <p><strong>Fecha de Emisión:</strong> {card.fecha_emision}</p>
            <p><strong>Fecha de Vencimiento:</strong> {card.fecha_vencimiento}</p>
            <p><strong>CVV:</strong> {card.cvv}</p>
            {/* Botones para Recargar y Retirar */}
            <button
              style={styles.button}
              onClick={() => openModal('recargar', card)}
            >
              Recargar Tarjeta
            </button>
            <button
              style={styles.buttonSecondary}
              onClick={() => openModal('retirar', card)}
            >
              Retirar Tarjeta
            </button>
          </div>
        ))
      ) : (
        <p style={styles.noCards}>No hay tarjetas asociadas.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{modalAction === 'recargar' ? 'Recargar Tarjeta' : 'Retirar de Tarjeta'}</h3>
            <p>
              <strong>Tarjeta:</strong> {selectedCard?.tarjeta_id}
            </p>
            <p>
              <strong>Cuenta:</strong> {selectedCard?.cuenta_id}
            </p>
            <label style={styles.label}>
              Monto:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
                min="1"
              />
            </label>
            <div style={styles.modalActions}>
              <button style={styles.modalButton} onClick={handleSubmit}>
                Confirmar
              </button>
              <button style={styles.modalCloseButton} onClick={handleModalClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  cardsContainer: {
    marginTop: '20px',
  },
  sectionTitle: {
    fontSize: '1.4em',
    color: '#333',
    marginBottom: '10px',
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  buttonSecondary: {
    backgroundColor: '#D32F2F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  noCards: {
    color: '#666',
    fontStyle: 'italic',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '400px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #CCC',
    marginBottom: '15px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  modalCloseButton: {
    backgroundColor: '#D32F2F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default UsuarioTarjetas;