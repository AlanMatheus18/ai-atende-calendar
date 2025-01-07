import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Logo from '../assets/Artboard2.png';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          boxShadow: '0 1px 25px 1px rgba(0, 0, 0, 0.2)', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center' 
        }}
      >
        <img src={Logo} alt="" style={{ height: '55px' }} />
        <Box 
          variant="h4" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            flexShrink: 1, 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              margin: 'auto 0', 
              marginRight: '40px' 
            }}
          >
            Calendário de agendamento
          </Typography>
        </Box>
      </AppBar>
    </Box>
  );
}
