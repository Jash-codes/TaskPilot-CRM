import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import { toast } from 'react-toastify';
import { PenTool, Eraser, Download } from 'lucide-react'; // Icons
import './Signature.css';

const SignaturePage = () => {
  // Ref to access the canvas API
  const sigPadRef = useRef(null);
  
  // State to store the saved image URL
  const [signatureData, setSignatureData] = useState(null);

  // Clear the canvas
  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear(); // Clear drawing
    }
    setSignatureData(null); // Clear saved state
  };

  // Save the canvas as an image
  const handleSave = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      // Get image data as Base64 PNG
      const dataUrl = sigPadRef.current.toDataURL('image/png');
      setSignatureData(dataUrl);
      toast.success('Signature captured successfully!');
    } else {
      toast.error('Please sign before saving.');
    }
  };

  return (
    <div className="signature-page-container">
      
      <div className="signature-header">
        <h1>E-Signature</h1>
        <p>Digitally sign contracts and documents securely.</p>
      </div>

      <div className="signature-card">
        
        <div className="signature-pad-wrapper">
          {/* The Canvas Component */}
          <SignaturePad
            ref={sigPadRef}
            options={{ 
              penColor: '#000000', // Black ink on white paper
              backgroundColor: 'rgba(255,255,255,0)' // Transparent/White
            }}
            canvasProps={{ className: 'signature-canvas' }}
          />
          <div style={{ 
            position: 'absolute', top: '10px', left: '10px', 
            color: '#ccc', fontSize: '0.8rem', pointerEvents: 'none' 
          }}>
            <PenTool size={14} style={{ display:'inline', marginRight:'5px' }}/>
            Sign inside the box
          </div>
        </div>

        <div className="signature-controls">
          <button className="btn-clear" onClick={handleClear}>
            <Eraser size={18} style={{ display:'inline', marginBottom:'-2px', marginRight:'5px' }}/>
            Clear
          </button>
          
          <button className="btn-save" onClick={handleSave}>
            Save Signature
          </button>
        </div>

        {/* Preview Area (Shows after saving) */}
        {signatureData && (
          <div className="signature-result">
            <h3>Captured Signature</h3>
            <div className="signature-image">
              <img src={signatureData} alt="My Signature" style={{ width: '100%' }} />
            </div>
            
            <a href={signatureData} download="my-signature.png" style={{ display: 'inline-block', marginTop: '1rem', color: '#5C7C89', textDecoration: 'none', fontWeight: '600' }}>
              <Download size={16} style={{ display:'inline', marginBottom:'-2px' }}/> Download PNG
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default SignaturePage;