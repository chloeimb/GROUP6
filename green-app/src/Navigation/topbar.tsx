import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './sidebar';


type DenseAppBarProps = {
  children?: React.ReactNode;
};

function isKeyboardEvent(event: React.KeyboardEvent | React.MouseEvent): event is React.KeyboardEvent {
  return 'key' in event;
}

const DenseAppBar: React.FC<DenseAppBarProps> = ({ children }) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && isKeyboardEvent(event)) {
          // It's a KeyboardEvent
          if (event.key === 'Tab' || event.key === 'Shift') {
            return;
          }
        }
    
        setState({ ...state, [anchor]: open });
      };
    
  
  return (
    <div className="dense-app-bar">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#567c53' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Going Green
          </Typography>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer}></TemporaryDrawer>
    </Box>
    </div>
  );
}

export default DenseAppBar;