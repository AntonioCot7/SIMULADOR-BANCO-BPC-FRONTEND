import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://ot0i7774d1.execute-api.us-east-1.amazonaws.com/dev',
});

const TablasUsuarios = {
  /**
   * Crear un nuevo usuario.
   * @param {Object} userData - Información del usuario a crear.
   * @returns {Promise} Respuesta de la API.
   */
  crearUsuario: (userData) => {
    return userApi.post('/usuarios/crear', userData);
  },

  /**
   * Listar todos los usuarios.
   * @returns {Promise} Respuesta de la API.
   */
  listarUsuarios: () => {
    return userApi.post('/usuarios/listar', {});
  },

  /**
   * Buscar un usuario por ID.
   * @param {string} usuario_id - ID del usuario a buscar.
   * @returns {Promise} Respuesta de la API.
   */
  buscarUsuario: (usuario_id) => {
    return userApi.post('/usuarios/buscar', { usuario_id });
  },

  /**
   * Modificar un usuario existente.
   * @param {Object} userData - Información actualizada del usuario.
   * @returns {Promise} Respuesta de la API.
   */
  modificarUsuario: (userData) => {
    return userApi.put('/usuarios/modificar', userData);
  },

  /**
   * Eliminar un usuario por ID.
   * @param {string} usuario_id - ID del usuario a eliminar.
   * @returns {Promise} Respuesta de la API.
   */
  eliminarUsuario: (usuario_id) => {
    return userApi.delete('/usuarios/eliminar', { data: { usuario_id } });
  },

  /**
   * Iniciar sesión.
   * @param {Object} credentials - Credenciales del usuario (email y password).
   * @returns {Promise} Respuesta de la API.
   */
  loginUsuario: (credentials) => {
    return userApi.post('/usuarios/login', credentials);
  },
};

export default TablasUsuarios;
