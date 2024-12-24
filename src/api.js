import axios from 'axios';

// API para usuarios
const userApi = axios.create({
  baseURL: 'https://9wrohokotb.execute-api.us-east-1.amazonaws.com/dev',
});

// API para cuentas
const accountApi = axios.create({
  baseURL: 'https://cgu0yle2ge.execute-api.us-east-1.amazonaws.com/dev',
});

// API para transacciones
const transactionApi = axios.create({
  baseURL: 'https://5amtlif2fl.execute-api.us-east-1.amazonaws.com/dev',
});

// API para soporte
const supportApi = axios.create({
  baseURL: 'https://4rz01b4u94.execute-api.us-east-1.amazonaws.com/dev',
});

// API para pagos
const paymentApi = axios.create({
  baseURL: 'https://nvjc6grb0m.execute-api.us-east-1.amazonaws.com/dev',
});

// API para solicitudes de préstamos
const solicitudPrestamoApi = axios.create({
  baseURL: 'https://obcj7q2rw0.execute-api.us-east-1.amazonaws.com/dev',
});

// API para tarjetas
const tarjetaApi = axios.create({
  baseURL: 'https://hlsrzcj7og.execute-api.us-east-1.amazonaws.com/dev',
});
// API para préstamos
const prestamoApi = axios.create({
  baseURL: 'https://uk1z8gf0ic.execute-api.us-east-1.amazonaws.com/dev',
});

// Exportar todas las APIs
export {
  userApi,
  accountApi,
  transactionApi,
  supportApi,
  paymentApi,
  solicitudPrestamoApi,
  tarjetaApi,
  prestamoApi,
};