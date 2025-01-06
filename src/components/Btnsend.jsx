
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';


const Btnsend = ({ selectedTime, date }) => {
  const [result, setResult] = useState('');
  const handleClick = () => {
    if (selectedTime && date) {
      setResult(`Data selecionada: ${date}\nHorário selecionado: ${selectedTime}`);
    }
  };
  useEffect(() => {
    setResult('');
  }, [date]);
  return (
    <>
    
      <Button
        variant="contained"
        sx={{
          width: "100%", margin: "30px auto", display: "block",
          opacity: selectedTime && date ? 1 : 0.5,
          pointerEvents: selectedTime && date ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={handleClick}
      >
        Agendar
      </Button>

      {result && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-line" }}>
          {result}
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Btnsend;
