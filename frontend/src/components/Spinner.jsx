// src/components/Spinner.jsx
import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;