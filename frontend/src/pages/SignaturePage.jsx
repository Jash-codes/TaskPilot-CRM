import React from 'react';
// 1. Update this import
import SignaturePadComponent from '../components/SignaturePad';

const SignaturePage = () => {
  return (
    <div className="page-layout-single-column">
      <header className="list-header">
        <h2>Sign Document</h2>
      </header>
      <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
        This is a simulation of an e-signature pad. In a real application, a client
        would receive a link to this page to sign a contract or project
        agreement.
      </p>
      {/* 2. Update this component name */}
      <SignaturePadComponent />
    </div>
  );
};

export default SignaturePage;