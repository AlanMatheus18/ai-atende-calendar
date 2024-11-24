
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '/src/assets/Artboard 2.png';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


const drawerWidth = 240;
const navItems = [''];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonth = new Date(prevMonth);
      nextMonth.setMonth(prevMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const prev = new Date(prevMonth);
      prev.setMonth(prevMonth.getMonth() - 1);
      return prev;
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
       
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo} alt="" style={{ height: '55px' }} />
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton onClick={handlePreviousMonth} sx={{ color: '#fff' }}>
              <ArrowBack />
            </IconButton>

            <Typography variant="h6" sx={{ color: '#fff', mx: 2 }}>
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>

            <IconButton onClick={handleNextMonth} sx={{ color: '#fff' }}>
              <ArrowForward />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
     
      </Box>
    </Box>
  );
}

Header.propTypes = {

  window: PropTypes.func,
};

export default Header;