import { Button } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

const ButtonComponent = ({ disabled, text, color, type, endIcon }) => {
  if (color === 'green') {
    return (
      <Button
        type={type}
        variant="contained"
        disabled={disabled}
        endIcon={endIcon}
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
        {text}
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
        disabled={disabled}
        endIcon={endIcon}
      >
        {text}
      </Button>
    )
  }
}

export default ButtonComponent