import { React } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function AppBarComponent({ title, isLoggedIn, handleLogOut }) {
  const navigate = useNavigate();

  return (
    <div className="AppBarContainer">
    <AppBar className="AppBar" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {isLoggedIn === true ? <Button color="inherit" onClick={handleLogOut}>Log Out</Button> : <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
      </Toolbar>
    </AppBar>
    </div>
  );
}

export default AppBarComponent;