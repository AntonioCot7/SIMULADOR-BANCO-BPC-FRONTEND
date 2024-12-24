import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountApi, transactionApi } from '../api';

function Transacciones({ usuarioId }) {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [usuarioDestino, setUsuarioDestino] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await accountApi.post('/cuentas/listar', { usuario_id: usuarioId });
        setCuentas(response.data.body);
        setCuentaOrigen(response.data.body[0]?.cuenta_id || '');
      } catch (error) {
        alert('Error al cargar las cuentas del usuario. Intente nuevamente más tarde.');
      }
    };
    fetchCuentas();
  }, [usuarioId]);

  const handleCrearTransaccion = async () => {
    try {
      if (!cuentaOrigen || !cuentaDestino || !usuarioDestino || !monto) {
        alert('Por favor, llena todos los campos.');
        return;
      }

      const response = await transactionApi.post('/transaccion/crear', {
        usuario_origen: usuarioId,
        cuenta_origen: cuentaOrigen,
        usuario_destino: usuarioDestino,
        cuenta_destino: cuentaDestino,
        monto: parseFloat(monto),
      });

      // Manejar el `statusCode` directamente del JSON de la respuesta
      const { statusCode, message, error } = response.data;

      if (statusCode === 200) {
        alert(message || 'Transacción realizada con éxito.');
        navigate('/interfaceuser');
      } else {
        alert(`Error ${statusCode}: ${error || 'Ocurrió un error inesperado.'}`);
        navigate('/interfaceuser');
      }
    } catch (error) {
      alert('Ocurrió un error inesperado. Intente nuevamente más tarde.');
      navigate('/interfaceuser');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Realizar una Transacción</h2>
      <div style={styles.form}>
        <label style={styles.label}>Usuario ID (Origen)</label>
        <input
          type="text"
          value={usuarioId}
          disabled
          style={styles.input}
        />

        <label style={styles.label}>Cuenta Origen</label>
        <select
          value={cuentaOrigen}
          onChange={(e) => setCuentaOrigen(e.target.value)}
          style={styles.input}
        >
          {cuentas.map((cuenta) => (
            <option key={cuenta.cuenta_id} value={cuenta.cuenta_id}>
              {cuenta.nombre_cuenta}
            </option>
          ))}
        </select>

        <label style={styles.label}>Cuenta Destino</label>
        <input
          type="text"
          placeholder="ID de la cuenta destino"
          value={cuentaDestino}
          onChange={(e) => setCuentaDestino(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Usuario ID (Destino)</label>
        <input
          type="text"
          placeholder="ID del usuario destino"
          value={usuarioDestino}
          onChange={(e) => setUsuarioDestino(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Monto</label>
        <input
          type="number"
          placeholder="Monto a transferir"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleCrearTransaccion} style={styles.button}>
          Realizar Transacción
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#F4F4F4',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#D32F2F',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Transacciones;
