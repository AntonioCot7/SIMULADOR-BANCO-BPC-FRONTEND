import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountApi } from '../api';

const Actions = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [selectedAction, setSelectedAction] = useState(null); // Acción seleccionada
  const [accounts, setAccounts] = useState([]); // Lista de cuentas

  const actions = [
    { id: 1, name: 'Transacción entre cuentas', icon: 'src/assets/icon1.png', path: '/transacciones' },
    { id: 2, name: 'Solicitar Préstamo', icon: 'src/assets/icon2.png', path: '/SolicitudPrestamo' },

  ];

  const handleActionClick = async (action) => {
    if (action.id === 3 || action.id === 4) {
      // Si es "Pagar deuda" o "Pagar servicios", mostrar el modal para seleccionar una cuenta
      try {
        const usuarioId = localStorage.getItem('usuario_id');
        if (!usuarioId) {
          alert('No se encontró un usuario válido.');
          return;
        }

        const response = await accountApi.post('/cuentas/listar', { usuario_id: usuarioId });
        setAccounts(response.data.body); // Guardar las cuentas obtenidas
        setSelectedAction(action); // Guardar la acción seleccionada
        setIsModalOpen(true); // Abrir el modal
      } catch (error) {
        console.error('Error al obtener las cuentas:', error);
        alert('Ocurrió un error al obtener las cuentas.');
      }
    } else {
      // Navegar directamente para otras acciones
      navigate(action.path);
    }
  };

  const handleAccountSelect = (cuentaId) => {
    setIsModalOpen(false); // Cerrar el modal
    navigate(`/tarjeta-interfaz/${cuentaId}`); // Navegar a la interfaz de tarjetas
  };

  const actionsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    padding: '1rem',
  };

  const actionButtonStyle = {
    fontWeight: 'bold',
    background: 'white',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '1rem',
    cursor: 'pointer',
  };

  const actionImageStyle = {
    width: '50px',
    height: '50px',
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

  const accountButtonStyle = {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#1976D2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    width: '100%',
    fontSize: '1rem',
  };

  return (
    <div>
      <div style={actionsContainerStyle}>
        {actions.map((action) => (
          <button
            key={action.id}
            style={actionButtonStyle}
            onClick={() => handleActionClick(action)}
          >
            <img src={action.icon} alt={action.name} style={actionImageStyle} />
            <p>{action.name}</p>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Selecciona una cuenta para {selectedAction?.name}</h2>
            {accounts.map((account) => (
              <button
                key={account.cuenta_id}
                style={accountButtonStyle}
                onClick={() => handleAccountSelect(account.cuenta_id)}
              >
                {account.nombre_cuenta} (Saldo: S/ {account.saldo})
              </button>
            ))}
            <button
              style={{
                ...accountButtonStyle,
                backgroundColor: '#f44336',
                marginTop: '1rem',
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;