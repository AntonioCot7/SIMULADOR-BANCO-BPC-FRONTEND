import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { userApi, tarjetaApi } from '../api';
import TarjetaCuentaUsuario from '../components/TarjetaCuentaUsuario';
import OperacionesTarjeta from '../components/OperacionesTarjeta';

const TarjetaInterfaz = () => {
  const { cuentaId } = useParams();
  const [userName, setUserName] = useState('');
  const [tarjetas, setTarjetas] = useState([]);

  const fetchTarjetas = async () => {
    try {
      const usuarioId = localStorage.getItem('usuario_id');
      if (!usuarioId) {
        console.error('No se encontró el usuario_id en localStorage');
        return;
      }

      const tarjetasResponse = await tarjetaApi.post('/tarjetas/listar', {
        usuario_id: usuarioId,
        cuenta_id: cuentaId,
      });

      setTarjetas(tarjetasResponse.data.body.tarjetas);
    } catch (error) {
      console.error('Error al obtener las tarjetas:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioId = localStorage.getItem('usuario_id');
        if (!usuarioId) {
          console.error('No se encontró el usuario_id en localStorage');
          return;
        }

        const userResponse = await userApi.post('/usuarios/buscar', { usuario_id: usuarioId });
        const { nombre } = userResponse.data.body;
        setUserName(nombre);

        await fetchTarjetas();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [cuentaId]);

  return (
    <div>
      <Header userName={userName} />
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.cardsContainer}>
            {tarjetas.length > 0 ? (
              tarjetas.map((tarjeta) => (
                <TarjetaCuentaUsuario
                  key={tarjeta.tarjeta_id}
                  tarjeta={tarjeta}
                  userName={userName}
                />
              ))
            ) : (
              <p style={styles.noCards}>No se encontraron tarjetas asociadas a esta cuenta.</p>
            )}
          </div>
          <div style={styles.actionsContainer}>
            <OperacionesTarjeta
              tarjetas={tarjetas}
              cuentaId={cuentaId}
              usuarioId={localStorage.getItem('usuario_id')}
              onUpdate={fetchTarjetas} // Refresca las tarjetas después de una acción
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    margin: '20px auto',
    maxWidth: '1200px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
  },
  cardsContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  actionsContainer: {
    flex: 1,
  },
  noCards: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default TarjetaInterfaz;