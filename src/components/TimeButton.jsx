import { Button } from '@mui/material'
import React from 'react'

const TimeButton = ({ text }) => {
  return (
    <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }} onClick={"handleclick"} >
      {text}
    </Button>
  )
}

export default TimeButton;