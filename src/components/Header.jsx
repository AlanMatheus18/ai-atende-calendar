 
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Logo from '../assets/Artboard 2.png';
import { IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function handlePreviousIndex(setIndex) {
  setIndex((prevIndex) => prevIndex - 1);
}

function handleNextIndex(setIndex) {
  setIndex((prevIndex) => prevIndex + 1);
}

export default function Header({ index, setCurrentIndex, calendar }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: '0 1px 25px 1px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
        <img src={Logo} alt="" style={{ height: '55px' }} />
        <Box variant="h4" component="div" sx={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center' }}>

          <IconButton  onClick={() => {
            document.title = index - 1
            handlePreviousIndex(setCurrentIndex);
          }} disabled={index===0}>
            <ArrowBack sx={{color: '#fff'}} />
          </IconButton>

          <Typography variant="h6" component="div" sx={{margin: 'auto 0'}}>
            {calendar[index]?.date}
          </Typography>

          <IconButton  onClick={() => {
            document.title = index + 1
            handleNextIndex(setCurrentIndex);
            }} disabled={index===calendar.length - 1}>
            <ArrowForward sx={{color: '#fff'}} />
          </IconButton>
        </Box>

      </AppBar>

    </Box>
  );
}