import { Alert, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import { phoneNumber } from '../utils/phoneNumber'

const Status = ({ status, date, selectedTime }) => {
  return (
    <Stack spacing={2}>
      {status === 'Success' ? (
        <Alert severity="success" sx={{ fontSize: '0.875rem' }} >
          Agendado com sucesso no dia <span style={{ fontWeight: 'bold' }}>{date}</span> às <span style={{ fontWeight: 'bold' }}>{selectedTime}.</span> <Link to={`https://wa.me/${phoneNumber}`}>Vá para nossa conversa no WhatsApp.</Link>
        </Alert>
      ) : status === 'Error' ? (
        <Alert severity="error" sx={{ fontSize: '0.875rem' }} >Erro ao registrar data. Tente novamente!</Alert>
      ) : status === 'NoOptions' ? (
        <Alert severity="warning" sx={{ fontSize: '0.875rem' }} >Não há horários disponíveis no turno escolhido para o dia <span style={{ fontWeight: 'bold' }}>{date}</span>. Escolha outro turno ou outra data</Alert>
      ) : null}
    </Stack>
  )
}

export default Status