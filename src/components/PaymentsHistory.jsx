import React, { useEffect, useState } from 'react';
import { accountApi, tarjetaApi, paymentApi } from '../api'; // Usamos las tres APIs

const PaymentsHistory = ({ refreshPayments }) => {
  const [payments, setPayments] = useState([]); // Lista de pagos
  const [selectedPayment, setSelectedPayment] = useState(null); // Pago seleccionado
  const [accounts, setAccounts] = useState([]); // Cuentas disponibles
  const [selectedAccount, setSelectedAccount] = useState(''); // Cuenta seleccionada
  const [selectedCard, setSelectedCard] = useState(''); // Tarjeta seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal abierto
  const [cards, setCards] = useState([]); // Tarjetas disponibles

  useEffect(() => {
    const loadPayments = async () => {
      const usuario_id = localStorage.getItem('usuario_id');
      if (!usuario_id) {
        console.error('No se encontró el usuario_id en localStorage.');
        return;
      }

      try {
        const response = await paymentApi.post('/pago/listar', { usuario_id });
        setPayments(response.data.body);
      } catch (error) {
        console.error('Error al cargar los pagos:', error);
      }
    };

    loadPayments();
  }, []);

  const handlePayClick = async (payment) => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      alert('No se encontró el usuario en el sistema.');
      return;
    }

    try {
      const accountsResponse = await accountApi.post('/cuentas/listar', { usuario_id });
      setAccounts(accountsResponse.data.body);
      setSelectedPayment(payment);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
      alert('No se pudieron cargar las cuentas. Intenta nuevamente.');
    }
  };

  const handleAccountSelect = async (accountId) => {
    setSelectedAccount(accountId);
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      alert('No se encontró el usuario en el sistema.');
      return;
    }

    try {
      const cardsResponse = await tarjetaApi.post('/tarjetas/listar', {
        cuenta_id: accountId,
        usuario_id,
      });
      setCards(cardsResponse.data.body.tarjetas);
    } catch (error) {
      console.error('Error al obtener las tarjetas:', error);
      alert('No se pudieron cargar las tarjetas. Intenta nuevamente.');
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedAccount || !selectedCard) {
      alert('Por favor, selecciona una cuenta y una tarjeta para proceder.');
      return;
    }

    if (!selectedPayment || !selectedPayment.pago_id) {
      alert('No se pudo obtener el pago seleccionado. Intenta nuevamente.');
      console.error('El pago seleccionado no contiene un campo pago_id:', selectedPayment);
      return;
    }

    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      alert('No se encontró el usuario en el sistema.');
      return;
    }

    const paymentPayload = {
      usuario_id,
      cuenta_id: selectedAccount,
      tarjeta_id: selectedCard,
      pago_id: selectedPayment.pago_id,
    };

    console.log('Payload enviado a la API de pagos:', JSON.stringify(paymentPayload, null, 2));

    try {
      const response = await paymentApi.post('/pago/realizar', paymentPayload);
      console.log('Respuesta de la API de pagos:', response.data);

      if (response.data.statusCode === 200) {
        alert('El pago se realizó exitosamente.');
        window.location.reload();
      } else {
        alert('Error al realizar el pago. Verifica los datos enviados.');
      }
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      alert('Ocurrió un error durante el pago. Intenta nuevamente.');
    }
  };

  const getStatusStyle = (status) => {
    return {
      color: status === 'pagado' ? '#4CAF50' : '#F44336',
      fontWeight: 'bold',
    };
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  return (
    <div>
      {payments && payments.length > 0 ? ( // Verifica si 'payments' es un array y no está vacío
        payments.map((payment, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <img
                src="/src/assets/history-icon.png"
                alt="Payment Icon"
                style={iconStyle}
              />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{payment.titulo}</h3>
            </div>
            <p>{payment.descripcion}</p>
            <p>
              Monto: <span style={{ color: 'red', fontWeight: 'bold' }}>S/ {payment.monto}</span>
            </p>
            <p>Fecha: {new Date(payment.fecha).toLocaleString()}</p>
            <p style={getStatusStyle(payment.estado)}>Estado: {payment.estado}</p>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1976D2',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
              onClick={() => handlePayClick(payment)}
            >
              Pagar
            </button>
          </div>
        ))
      ) : (
        <p>No hay pagos disponibles.</p> // Mensaje si no hay pagos
      )}
  
      {isModalOpen && (
        <div style={{
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
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '10px',
            width: '400px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}>
            <h2>Selecciona una cuenta y una tarjeta</h2>
            <label>Cuentas:</label>
            <select
              value={selectedAccount}
              onChange={(e) => handleAccountSelect(e.target.value)}
            >
              <option value="">Seleccionar cuenta</option>
              {accounts.map((account) => (
                <option key={account.cuenta_id} value={account.cuenta_id}>
                  {account.nombre_cuenta}
                </option>
              ))}
            </select>
            <br />
            <label>Tarjetas:</label>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              <option value="">Seleccionar tarjeta</option>
              {cards.map((card) => (
                <option key={card.tarjeta_id} value={card.tarjeta_id}>
                  {card.tarjeta_id}
                </option>
              ))}
            </select>
            <br />
            <button
              style={{
                padding: '0.7rem 1.5rem',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
              onClick={handleConfirmPayment}
            >
              Confirmar Pago
            </button>
            <button
              style={{
                padding: '0.7rem 1.5rem',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
                marginLeft: '1rem',
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

export default PaymentsHistory;