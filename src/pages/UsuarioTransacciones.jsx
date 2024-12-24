import React from 'react';
import Transacciones from '../components/Transacciones';

function UsuarioTransacciones() {
  const usuarioId = localStorage.getItem('usuario_id');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Haga sus transacciones aquí</h1>
      <Transacciones usuarioId={usuarioId} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: '2rem',
    color: '#D32F2F',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
};

export default UsuarioTransacciones;
