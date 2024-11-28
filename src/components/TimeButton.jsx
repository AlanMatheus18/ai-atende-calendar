import { Button } from '@mui/material';
import React from 'react';

const TimeButton = ({ text, selectedTime, onClick }) => {
  return (
    <Button
      variant="contained"
      color={selectedTime === text ? "secondary" : "primary"}
      sx={{ fontWeight: 'bold' }}
      onClick={() => onClick(text)}
    >
      {text}
    </Button>
  );
};

export default TimeButton;
