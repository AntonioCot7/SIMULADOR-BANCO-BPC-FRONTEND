import React, { useState } from 'react';
import { accountApi } from '../api';

function CuentaUsuario({ nombreCuenta, saldo, interes, cuentaId, actualizarCuentas }) {
  const [showModal, setShowModal] = useState(false);
  const [monto, setMonto] = useState('');

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setMonto('');
  };

  const handleAgregarSaldo = async () => {
    try {
      const usuarioId = localStorage.getItem('usuario_id');
      if (!monto || isNaN(monto) || monto <= 0) {
        alert('Monto inválido. Inténtalo nuevamente.');
        return;
      }

      await accountApi.post('/cuentas/agregar-saldo', {
        usuario_id: usuarioId,
        cuenta_id: cuentaId,
        monto: parseFloat(monto),
      });

      alert('Saldo agregado exitosamente.');
      handleModalClose();
      actualizarCuentas(); // Refrescar cuentas en la interfaz principal
    } catch (error) {
      console.error('Error al agregar saldo:', error);
      alert('No se pudo agregar saldo. Inténtalo nuevamente.');
    }
  };

  return (
    <div style={styles.card}>
      <div>
        <h3 style={styles.accountName}>{nombreCuenta}</h3>
        <p style={styles.info}>Interés: {interes}%</p>
      </div>
      <div>
        <h3 style={styles.balance}>S/ {saldo.toFixed(2)}</h3>
        <button style={styles.addBalanceButton} onClick={handleModalOpen}>
          Agregar Saldo
        </button>
      </div>

      {/* Modal para agregar saldo */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Agregar Saldo</h3>
            <p>
              <strong>Cuenta:</strong> {nombreCuenta}
            </p>
            <label style={styles.label}>
              Monto:
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                style={styles.input}
                min="1"
              />
            </label>
            <div style={styles.modalActions}>
              <button style={styles.modalButton} onClick={handleAgregarSaldo}>
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
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  accountName: {
    margin: 0,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  info: {
    margin: 0,
    fontSize: '0.9em',
    color: '#555',
  },
  balance: {
    margin: 0,
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  addBalanceButton: {
    backgroundColor: '#1E88E5',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '10px',
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
    backgroundColor: '#1E88E5',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  modalCloseButton: {
    backgroundColor: '#D32F2F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default CuentaUsuario;