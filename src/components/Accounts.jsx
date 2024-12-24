import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para manejar la navegación
import { accountApi } from '../api';

const Accounts = ({ accounts }) => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState(null); // Cuenta seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [monto, setMonto] = useState(''); // Monto ingresado

  const handleNavigateToTarjetas = (cuentaId) => {
    navigate(`/tarjeta-interfaz/${cuentaId}`);
  };

  const openModal = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMonto('');
  };

  const handleAddSaldo = async () => {
    if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    try {
      const usuario_id = localStorage.getItem('usuario_id');
      if (!usuario_id) {
        alert('No se encontró un usuario válido.');
        return;
      }

      const payload = {
        usuario_id,
        cuenta_id: selectedAccount.cuenta_id,
        monto: parseFloat(monto),
      };

      const response = await accountApi.post('/cuentas/agregar-saldo', payload);
      console.log('Respuesta del servidor:', response.data);

      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar saldo:', error);
      alert('Ocurrió un error al agregar el saldo.');
    } finally {
      closeModal();
    }
  };

  const accountsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const accountCardStyle = {
    background: 'white',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    height: '120px',
    cursor: 'pointer', // Esto hace que el contenedor sea clicable
  };

  const bankIconStyle = {
    width: '40px',
    height: '40px',
  };

  const accountInfoStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '5px',
  };

  const accountNameStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    margin: 0,
  };

  const interestStyle = {
    fontSize: '1.1rem',
    color: '#555',
    margin: 0,
  };

  const saldoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '5px',
  };

  const saldoStyle = {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: 'black',
    margin: 0,
  };

  const saldoActualStyle = {
    fontSize: '1.2rem',
    color: '#555',
    margin: 0,
  };

  const buttonStyle = {
    background: '#de0a0a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
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

  return (
    <div style={accountsContainerStyle}>
      {accounts && accounts.length > 0 ? ( // Verifica si 'accounts' es un array y no está vacío
        accounts.map((account) => (
          <div 
            key={account.cuenta_id} 
            style={accountCardStyle} 
            onClick={() => handleNavigateToTarjetas(account.cuenta_id)}
          >
            <img 
              src="/src/assets/bank-icon.png"
              alt="Banco"
              style={bankIconStyle}
            />
            <div style={accountInfoStyle}>
              <p style={accountNameStyle}>{account.nombre_cuenta}</p>
              <p style={interestStyle}>Interés: {account.interes}%</p>
            </div>
            <div style={saldoContainerStyle}>
              <p style={saldoStyle}>S/ {account.saldo}</p>
              <p style={saldoActualStyle}>Saldo actual</p>
            </div>
            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation(); // Evita que se active la navegación al hacer clic en el botón
                openModal(account);
              }}
            >
              Agregar Saldo
            </button>
          </div>
        ))
      ) : (
        <p>No hay cuentas disponibles.</p> // Mensaje si no hay cuentas
      )}

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Agregar Saldo</h2>
            <p>Cuenta: {selectedAccount?.nombre_cuenta}</p>
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
                onClick={handleAddSaldo}
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
    </div>
  );
};

export default Accounts;