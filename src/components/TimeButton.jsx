import { Button } from '@mui/material';
import React from 'react';

const TimeButton = ({ text, selectedTime, onClick }) => {
  return (
    
    <Button
      variant="contained"
      sx={{
        background:selectedTime === text ? "" : "transparent",
        fontWeight: 'bold',
        color: selectedTime === text ? "white" : "blue",
        border: "2px solid blue",
        width: 'calc(35% + 100px)',
        height: '40px',
      }}
      onClick={() => onClick(text)}
    >
      {text}
    </Button>
  );
};

export default TimeButton;