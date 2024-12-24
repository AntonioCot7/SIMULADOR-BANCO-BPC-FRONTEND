import React, { useState } from 'react';
import './Inicio.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import { FaPiggyBank, FaCreditCard, FaMoneyBillWave, FaPercentage, FaLandmark, FaGooglePlay, FaAndroid, FaApple } from 'react-icons/fa';

function Inicio() {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="Inicio">
      <header className="navbar">
        <h1><FaLandmark className="navbar-icon" /> BPC</h1>
        <nav>
          <Link to="/proximamente">Productos</Link>
          <Link to="/proximamente">Promociones</Link>
          <Link to="/proximamente">Servicios</Link>
          <Link to="/proximamente">Sucursales</Link>
          <Link to="/proximamente">Atención al Cliente</Link>
        </nav>
        <div className="cta-buttons">
          <Link to="/login" className="cta banca-internet">Inicia sesión</Link>
        </div>
      </header>

      <main>
        <div className="register-section">
          <div className="register-info">
            <h2>Bienvenido a BPC</h2>
            <p>En el Banco Peruano Continental, somos tu aliado financiero, brindándote soluciones innovadoras y seguras para tu desarrollo. Únete a BPC y gestiona tus finanzas con confianza y el respaldo de un banco con identidad peruana.</p>
            <button onClick={toggleForm} className="toggle-button">
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
            {isRegister && (<img src="src/assets/edificio-bcp.png" alt="Banco BPC" className="edificio-img" />)}
          </div>
          {isRegister ? <RegisterForm /> : <LoginForm />}
        </div>

        <section className="productos-servicios">
          <div className="servicio-card">
            <FaPiggyBank className="servicio-icon" />
            <h3>Cuenta de Ahorros</h3>
            <p>Obtén intereses atractivos y maneja tu cuenta desde cualquier lugar.</p>
            <Link to="/proximamente">Más información &gt;</Link>
          </div>
          <div className="servicio-card">
            <FaCreditCard className="servicio-icon" />
            <h3>Tarjeta de Crédito</h3>
            <p>Beneficios exclusivos para nuestros clientes y sin comisiones de mantenimiento.</p>
            <Link to="/proximamente">Aprender más &gt;</Link>
          </div>
          <div className="servicio-card">
            <FaMoneyBillWave className="servicio-icon" />
            <h3>Préstamos Personales</h3>
            <p>Accede a préstamos con tasas preferenciales para cumplir tus sueños.</p>
            <Link to="/proximamente">Solicita aquí &gt;</Link>
          </div>
          <div className="servicio-card">
            <FaPercentage className="servicio-icon" />
            <h3>Tasas de Interés</h3>
            <p>Consulta nuestras tasas de interés competitivas en el mercado.</p>
            <Link to="/proximamente">Ver tasas &gt;</Link>
          </div>
        </section>

        <section className="product-discovery-section">
          <div className="product-discovery-content">
            <div className="discovery-icon">
              <FaLandmark className="large-icon" />
            </div>
            <div className="discovery-text">
              <h3>Descubre productos a tu medida</h3>
              <p>Ingresa solo tu DNI y conoce todos los productos a los que puedes acceder.</p>
              <input type="text" placeholder="Número de documento" className="dni-input" />
              <div className="checkbox-container">
                <input type="checkbox" id="data-consent" />
                <label htmlFor="data-consent">
                  Autorizo el tratamiento de mis datos personales para{" "}
                  <Link to="/terms" className="terms-link">fines comerciales y/o publicitarios</Link>
                </label>
              </div>
              <button className="discover-button" onClick={() => window.location.href = '/proximamente'}>
                Descubrir productos
              </button>
            </div>
          </div>
        </section>

        <section className="app-promotion-section">
          <div className="app-promotion-content">
            <div className="app-logo">
              <div className="app-logo-icon">
                <FaLandmark />
              </div>
              <div>BPC APP</div>
            </div>
            <p>Todas las operaciones desde tu celular</p>
            <div className="app-stores">
              <Link to="/proximamente" className="store-button">
                <FaApple className="store-icon" />
                Consíguelo en el App Store
              </Link>
              <Link to="/proximamente" className="store-button">
                <FaGooglePlay className="store-icon" />
                Disponible en Google Play
              </Link>
              <Link to="/proximamente" className="store-button">
                <FaAndroid className="store-icon" />
                Explóralo en AppGallery
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/proximamente">Seguridad</Link>
          <Link to="/proximamente">Aviso Legal</Link>
          <Link to="/proximamente">Cláusulas Generales de Contratación</Link>
          <Link to="/proximamente">Mapa del Sitio</Link>
          <Link to="/proximamente">Libro de Reclamaciones</Link>
          <Link to="/proximamente">Llámanos (01) 595-0000</Link>
        </div>
        <div className="footer-info">
          Banco BPC - RUC 20100130204 | Av. República de Panamá 3055 - San Isidro
        </div>
      </footer>
    </div>
  );
}

export default Inicio;