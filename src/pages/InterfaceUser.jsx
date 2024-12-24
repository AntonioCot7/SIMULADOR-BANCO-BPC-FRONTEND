import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Actions from '../components/Actions';
import Accounts from '../components/Accounts';
import PaymentsHistory from '../components/PaymentsHistory';
import PrestamosHistory from '../components/PrestamosHistory';
import SupportButton from '../components/SupportButton';
import { accountApi, userApi, paymentApi } from '../api';

const InterfaceUser = () => {
  const [userName, setUserName] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la ventana emergente
  const [newAccountData, setNewAccountData] = useState({
    nombre_cuenta: '',
    saldo: 0,
    interes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario_id = localStorage.getItem('usuario_id');
        if (!usuario_id) {
          console.error('No se encontró el usuario_id en localStorage');
          return;
        }
        setUsuarioId(usuario_id);

        const userResponse = await userApi.post('/usuarios/buscar', { usuario_id });
        const { nombre } = userResponse.data.body;
        setUserName(nombre);

        const accountResponse = await accountApi.post('/cuentas/listar', { usuario_id });
        setAccounts(accountResponse.data.body);

        const paymentResponse = await paymentApi.post('/pago/listar', { usuario_id });
        const paymentsData = paymentResponse.data.body.map((payment) => ({
          title: payment.titulo,
          description: payment.descripcion,
          amount: payment.monto,
          date: new Date(payment.fecha).toLocaleString(),
          status: payment.estado,
        }));
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateAccount = async () => {
    try {
      console.log('Enviando solicitud para crear cuenta con:', {
        usuario_id: usuarioId,
        cuenta_datos: {
          saldo: newAccountData.saldo,
          nombre_cuenta: newAccountData.nombre_cuenta,
          interes: newAccountData.interes,
        },
      });

      const response = await accountApi.post('/cuentas/crear', {
        usuario_id: usuarioId,
        cuenta_datos: {
          saldo: newAccountData.saldo,
          nombre_cuenta: newAccountData.nombre_cuenta,
          interes: newAccountData.interes,
        },
      });

      console.log('Respuesta de la API:', response);

      if (response.status === 200 && response.data.statusCode === 200) {
        console.log('Cuenta creada exitosamente');
        alert(`Cuenta creada exitosamente con ID: ${response.data.body}`);

        // Cierra la ventana emergente
        setIsModalOpen(false);

        // Recargar las cuentas
        const accountResponse = await accountApi.post('/cuentas/listar', { usuario_id: usuarioId });
        console.log('Cuentas recargadas:', accountResponse.data.body);
        setAccounts(accountResponse.data.body);
      } else {
        console.log('Error en la respuesta de la API:', response);
        alert('Hubo un error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const interfaceUserStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2rem',
    gap: '2rem',
  };

  const leftStyle = {
    width: '40%',
  };

  const rightStyle = {
    width: '70%',
  };

  const historyContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1.5rem',
    marginTop: '2rem',
  };

  const historySectionStyle = {
    flex: 1,
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const createAccountButtonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',  // Borde redondeado
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    marginTop: '20px',
  };

  const modalInputStyle = {
    marginBottom: '10px',
    width: '100%',
    padding: '10px 5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  };

  // Estilo para el texto de "Crear Nueva Cuenta"
  const modalTitleStyle = {
    textAlign: 'center', // Centrado horizontal
    fontSize: '1.5rem',
    marginBottom: '20px',
  };

  return (
    <div style={interfaceUserStyle}>
      <Header userName={userName} />
      <div style={contentStyle}>
        <div style={leftStyle}>
          <h2 style={{ fontSize: '1.5rem', color: '#F57C00', marginBottom: '1rem' }}>¿Qué vamos a hacer hoy?</h2>
          <Actions />
        </div>
        <div style={rightStyle}>
          <h2 style={{ fontSize: '1.5rem', color: '#F57C00', marginBottom: '1rem' }} >
            Mis Cuentas
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                marginLeft: '20px',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </h2>
          <Accounts accounts={accounts} />
          <div style={historyContainerStyle}>
            <div style={historySectionStyle}>
              <h2 style={{ fontSize: '1.5rem', color: '#F57C00', marginBottom: '1rem' }}>Historial de pagos</h2>
              {payments && payments.length > 0 ? ( // Verifica si 'payments' es un array y no está vacío
                <PaymentsHistory payments={payments} /> 
              ) : (
                <p>No hay pagos disponibles.</p> // Mensaje si no hay pagos
              )}
            </div>
            <div style={historySectionStyle}>
              <h2 style={{ fontSize: '1.5rem', color: '#F57C00', marginBottom: '1rem' }}>Historial de préstamos</h2>
              <PrestamosHistory usuarioId={usuarioId} /> 
            </div>
          </div>
        </div>
      </div>
      <SupportButton />
      
      {/* Modal para crear cuenta */}
      {isModalOpen && (
        <>
          <div style={overlayStyle} onClick={() => setIsModalOpen(false)}></div>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Crear Nueva Cuenta</h3> {/* Título centrado */}
            <label>Nombre de la cuenta</label>
            <input
              type="text"
              name="nombre_cuenta"
              value={newAccountData.nombre_cuenta}
              onChange={handleInputChange}
              style={modalInputStyle}
            />
            <br />
            <label>Saldo</label>
            <input
              type="number"
              name="saldo"
              value={newAccountData.saldo}
              onChange={handleInputChange}
              style={modalInputStyle}
            />
            <br />
            <label>Interés</label>
            <input
              type="number"
              name="interes"
              value={newAccountData.interes}
              onChange={handleInputChange}
              style={modalInputStyle}
            />
            <br />
            <button onClick={handleCreateAccount} style={createAccountButtonStyle}>
              Crear Cuenta
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InterfaceUser;
