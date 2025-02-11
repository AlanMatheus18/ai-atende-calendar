import React from 'react'
import { Alert, Box, CircularProgress } from '@mui/material'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const SkeletonRender = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5rem',
      padding: '1rem',
    }}>
      <Alert severity="info" icon={<QueryBuilderIcon />}>
        Ótima escolha! Estamos confirmando seu agendamento... Em breve, você receberá a confirmação. Fique de olho! 🚀✅
      </Alert>

      <CircularProgress />
    </Box>
  )
}

export default SkeletonRender