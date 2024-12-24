import React, { useState } from 'react';
import SupportForm from './SupportForm';

const SupportButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const supportButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    cursor: 'pointer',
    width: '100px',
    height: '90px',
  };

  return (
    <>
      <img
        src="/src/assets/support-icon.png"
        alt="Support"
        style={supportButtonStyle}
        onClick={() => setIsVisible(!isVisible)}
      />
      {isVisible && <SupportForm />}
    </>
  );
};

export default SupportButton;
