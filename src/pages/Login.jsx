import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.pageContainer}>
      <button onClick={goToHome} style={styles.homeButton}>
        Ir al Inicio
      </button>
        <LoginForm />
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#D32F2F',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  homeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#FFFFFF',
    color: '#D32F2F',
    fontSize: '1em',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default Login;
