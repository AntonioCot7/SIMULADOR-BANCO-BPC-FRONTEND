import React from 'react';

const TarjetaCuentaUsuario = ({ tarjeta, userName }) => {
  return (
    <div style={styles.container}>
      <div style={styles.cardWrapper}>
        {/* Parte Frontal */}
        <div style={styles.cardFront}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>BPCart</h3>
          </div>
          <p style={styles.cardNumber}>{tarjeta.tarjeta_id}</p>
          <div style={styles.cardDetails}>
            <div>
              <p style={styles.cardHolderLabel}>Card Holder Name</p>
              <p style={styles.cardHolderValue}>{userName}</p>
            </div>
            <div>
              <p style={styles.expiryLabel}>Expired Date</p>
              <p style={styles.expiryValue}>
                {tarjeta.fecha_vencimiento.slice(0, 7)}
              </p>
            </div>
          </div>
        </div>

        {/* Parte Trasera */}
        <div style={styles.cardBack}>
          <div style={styles.blackStripe}></div>
          <div style={styles.signatureSection}>
            <p style={styles.signatureLabel}>Authorized Signature</p>
            <div style={styles.signatureArea}></div>
            <p style={styles.cvvLabel}>
              CVV: <span style={styles.cvv}>{tarjeta.cvv}</span>
            </p>
          </div>
          <div style={styles.statusContainer}>
            <p style={styles.status}>
              Estado:{" "}
              <span
                style={{
                  ...styles.activeStatus,
                  color: tarjeta.estado === "activa" ? "white" : "#ff6b6b",
                }}
              >
                {tarjeta.estado}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Saldo Disponible */}
      <div style={styles.balanceContainer}>
        <p style={styles.balanceText}>
          Saldo Disponible: <span>S/ {tarjeta.saldo_disponible.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  cardWrapper: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cardFront: {
    width: '320px',
    height: '200px',
    borderRadius: '15px',
    background: '#222222',
    color: '#fff',
    padding: '20px',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s',
  },
  cardBack: {
    width: '320px',
    height: '200px',
    borderRadius: '15px',
    background: '#222222',
    color: '#fff',
    padding: '20px',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', // Mejora el espacio
    alignItems: 'center', // Centrar contenido
    transition: 'transform 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
  },
  cardNumber: {
    fontSize: '1.4rem',
    letterSpacing: '2px',
    margin: '10px 0',
    textAlign: 'center',
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#bbbbbb',
  },
  cardHolderValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  expiryLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#bbbbbb',
  },
  expiryValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  blackStripe: {
    width: '100%',
    height: '40px',
    backgroundColor: '#000000',
    marginBottom: '10px',
  },
  signatureSection: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#222222', // Cambia el fondo a negro
    borderRadius: '5px',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
    textAlign: 'center', // Centrar contenido
  },
  signatureArea: {
    width: '100%',
    height: '30px',
    backgroundColor: '#ffffff', // Mantén la raya blanca
    border: '1px solid #dddddd',
    marginBottom: '10px',
  },
  signatureLabel: {
    fontSize: '0.8rem',
    color: 'white',
    marginBottom: '5px',
  },
  cvvLabel: {
    fontSize: '1rem',
    color: 'white',
  },
  cvv: {
    fontWeight: 'bold',
    color: 'white',
  },
  statusContainer: {
    textAlign: 'center',
  },
  status: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  activeStatus: {
    fontWeight: 'bold',
  },
  balanceContainer: {
    width: '320px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  },
  balanceText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333333',
  },
};

export default TarjetaCuentaUsuario;