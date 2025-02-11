import { Button, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

const ButtonComponent = ({ isActive, text, color, type, endIcon }) => {
  if (color === 'green') {
    return (
      <Button
        type={type}
        variant="contained"
        disabled={isActive}
        endIcon={isActive ? <CircularProgress size={20} color="inherit" /> : endIcon}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
          '&:disabled': {
            backgroundColor: green[300],
            color: 'rgba(255, 255, 255, 0.86)',
          }
        }}
      >
        {!isActive && text}
      </Button>
    )
  } else {
    return (
      <Button
        type={type}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
        variant="contained"
        disabled={isActive}
        endIcon={isActive ? <CircularProgress size={20} color="inherit" /> : endIcon}
      >
        {!isActive && text}
      </Button>
    )
  }
}

export default ButtonComponent