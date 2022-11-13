import { React, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

function AppBarComponent({ title, isLoggedIn, setIsLoggedIn, handleLogOut }) {
  const [openLoginMenu, setOpenLoginMenu] = useState(false);
  const [openRegisterMenu, setOpenRegisterMenu] = useState(false);

  const handleOpenLogin = () => setOpenLoginMenu(true);
  const handleCloseLogin = () => setOpenLoginMenu(false);

  const handleOpenRegister = () => setOpenRegisterMenu(true);
  const handleCloseRegister = () => setOpenRegisterMenu(false);

  return (
    <AppBar className="AppBar" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {isLoggedIn === true ? <Button color="inherit" onClick={handleLogOut}>Log Out</Button> : <><Button color="inherit" onClick={handleOpenLogin}>Login</Button>
          <LoginComponent openLoginMenu={openLoginMenu} handleCloseLogin={handleCloseLogin} setIsLoggedIn={setIsLoggedIn} handleOpenRegister={handleOpenRegister}/>
          <RegisterComponent openRegisterMenu={openRegisterMenu} handleCloseRegister={handleCloseRegister} setIsLoggedIn={setIsLoggedIn} /></>}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;