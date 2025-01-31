
import { Alert, Button, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';


const Btnsend = ({ status, selectedTime, date, handleSchedule, endIcon }) => {
  return (
    <>
      {status !== 'Success' && status !== 'Error' && (
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
      )}
      {status === 'Success' ? (
        <Stack spacing={2}>
          <Alert severity="success" sx={{ fontSize: '0.875rem' }} >
            Agendado com sucesso no dia <span style={{ fontWeight: 'bold' }}>{date}</span> às <span style={{ fontWeight: 'bold' }}>{selectedTime}.</span> <Link to={'https://wa.me/558130940025'}>Volte para nossa conversa</Link>
          </Alert>
        </Stack>
      ) : status === 'Error' ? (
        <Stack spacing={2}>
          <Alert severity="error" sx={{ fontSize: '0.875rem' }} >Erro ao registrar data. Tente novamente!</Alert>
        </Stack>
      ) : status === 'NoOptions' ? (
        <Stack spacing={2}>
          <Alert severity="warning" sx={{ fontSize: '0.875rem' }} >Não há horários disponíveis no turno escolhido para o dia <span style={{ fontWeight: 'bold' }}>{date}</span>. Tente escolher outro turno ou período</Alert>
        </Stack>
      ) : null}
    </>
  );
};

export default Btnsend;
