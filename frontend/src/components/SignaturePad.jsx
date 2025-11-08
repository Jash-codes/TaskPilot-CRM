import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper'; // 1. Use new import
import { toast } from 'react-toastify';

const SignaturePadComponent = () => {
  const sigPadRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  const clear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
    }
    setSignatureData(null);
  };

  const save = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      // 2. The new 'save' API is slightly different
      const dataUrl = sigPadRef.current.toDataURL('image/png');
      setSignatureData(dataUrl);

      toast.success('Signature Saved (Simulation)!');
    } else {
      toast.error('Please provide a signature');
    }
  };

  return (
    <div className="signature-container">
      <h3>Please Sign Below:</h3>
      <div className="signature-pad-wrapper">
        {/* 3. The component setup is different */}
        <SignaturePad
          ref={sigPadRef}
          options={{ penColor: 'var(--color-primary)' }}
          canvasProps={{ className: 'signature-canvas' }}
        />
      </div>
      <div className="btn-group">
        <button className="btn btn-secondary" onClick={clear}>
          Clear
        </button>
        <button className="btn" onClick={save}>
          Save Signature
        </button>
      </div>

      {signatureData && (
        <div className="signature-preview">
          <h4>Saved Signature (Demo):</h4>
          <img
            src={signatureData}
            alt="Your saved signature"
            style={{ border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  );
};

export default SignaturePadComponent;