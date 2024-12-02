import React from 'react';
import { Button } from '@mui/material';

const Btnsend = ({ selectedTime, date }) => {
  const handleClick = () => {
    if (selectedTime && date) {
      alert(`Data selecionada: ${date}\nHorário selecionado: ${selectedTime}`);
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ width: "150px", margin: "30px auto", display: "block" ,
        opacity: selectedTime && date ? 1 : 0.5, 
        pointerEvents: selectedTime && date ? "auto" : "none",
        transition: "opacity 0.3s ease",}}
      onClick={handleClick}
    >
      Agendar
    </Button>
  );
};

export default Btnsend;
