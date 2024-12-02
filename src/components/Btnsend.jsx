import React from 'react';
import { Button } from '@mui/material';

const Btnsend = ({ selectedTime, date }) => {
  const handleClick = () => {
    if (selectedTime && date) {
      alert(`Data selecionada: ${date}\nHorário selecionado: ${selectedTime}`);
    } else {
      alert("Por favor, selecione uma data e um horário antes de agendar.");
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ width: "150px", margin: "30px auto", display: "block" }}
      onClick={handleClick}
    >
      Agendar
    </Button>
  );
};

export default Btnsend;
