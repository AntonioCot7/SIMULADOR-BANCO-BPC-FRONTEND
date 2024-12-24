import { userApi } from './api';

export const getUserData = async (usuario_id) => {
  try {
    const response = await userApi.post('/usuarios/buscar', { usuario_id });
    console.log('Respuesta completa del servidor (Buscar Usuario):', response.data);
    return response.data.body;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error;
  }
};