
import { Button } from '@mui/material';
import React from 'react';


const Btnsend = ({ selectedTime, date, handleSchedule }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: "100%", margin: "30px auto", display: "block",
        opacity: selectedTime && date ? 1 : 0.5,
        pointerEvents: selectedTime && date ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
      onClick={handleSchedule}
    >
      Agendar
    </Button>
  );
};

export default Btnsend;
