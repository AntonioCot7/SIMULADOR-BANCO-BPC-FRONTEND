import { Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './pages/Login';
import Proximamente from './pages/Proximamente';
import InterfaceUser from './pages/InterfaceUser';
import UsuarioTransacciones from './pages/UsuarioTransacciones';
import SolicitudPrestamo from './pages/Prestamo'; // Corrección en el nombre de importación
import ProtectedRoute from './components/ProtectedRoute';
import TarjetaInterfaz from './pages/TarjetaInterfaz'; // Corrección en el nombre de importación
import PerfilUsuario from './pages/PerfilUsuario';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/proximamente" element={<Proximamente />} />
      <Route
        path="/interfaceuser"
        element={
          <ProtectedRoute>
            <InterfaceUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transacciones"
        element={
          <ProtectedRoute>
            <UsuarioTransacciones />
          </ProtectedRoute>
        }
      />
      {/* Nueva ruta agregada */}
      <Route
        path="/solicitudprestamo"
        element={
          <ProtectedRoute>
            <SolicitudPrestamo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tarjeta-interfaz/:cuentaId"
        element={
          <ProtectedRoute>
            <TarjetaInterfaz />
          </ProtectedRoute>
        }
      />
      <Route path="/perfilusuario" element={<PerfilUsuario />} />

    </Routes>
  );
}

export default App;