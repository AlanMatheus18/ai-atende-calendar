import React from 'react'
import { Alert, Box, CircularProgress } from '@mui/material'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const SkeletonTimes = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5rem',
      padding: '1rem',
    }}>
      <Alert severity="info" icon={<HourglassEmptyIcon />}>
        Estamos verificando a disponibilidade... Segure firme! Em instantes, você verá as melhores opções para agendar seu compromisso. ⏳✨
      </Alert>

      <CircularProgress />
    </Box>
  )
}

export default SkeletonTimes