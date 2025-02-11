
import { Button, Typography } from '@mui/material';
import React from 'react';


const Btnsend = ({ selectedTime, date, handleSchedule, endIcon }) => {
  return (
    <>
      <Typography component={"p"} align={"center"} fontSize={"0.935rem"}>
        Seleciona o horário acima <br /> Confirme no botão <span style={{ fontWeight: 600 }}> AGENDAR </span>
      </Typography>
      <Button
        endIcon={endIcon}
        variant="contained"
        sx={{
          width: "100%",
          marginBottom: "1rem",
          opacity: selectedTime && date ? 1 : 0.5,
          pointerEvents: selectedTime && date ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={handleSchedule}
      >
        Agendar
      </Button>
    </>
  );
};

export default Btnsend;
