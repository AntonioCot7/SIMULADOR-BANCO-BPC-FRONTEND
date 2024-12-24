import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName }) => {
  const navigate = useNavigate();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    color: 'white',
    padding: '0.25rem 2rem',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    background: 'orange',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  };

  const imgStyle = {
    width: '20px',
    height: '20px',
    marginRight: '0.5rem',
  };

  const handleConfigClick = () => {
    navigate('/perfilusuario'); // Redirigir a la nueva página de perfil de usuario
  };

  return (
    <header style={headerStyle}>
      <h2>Hola, {userName}</h2>
      <button style={buttonStyle} onClick={handleConfigClick}>
        <img
          src="src/assets/settings.png"
          alt="Configuración"
          style={imgStyle}
        />
        Configuración
      </button>
    </header>
  );
};

export default Header;