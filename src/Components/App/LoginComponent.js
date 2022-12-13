import { React, useContext, useState } from 'react';
import { FormControl, Stack, Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { AppContext } from '../../App';
const config = require('../../config');
const util = require('../../Utilities/util');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function LoginComponent({ setIsLoggedIn, handleCloseLogin, openLoginMenu, handleOpenRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleOpenSnackbar } = useContext(AppContext);

  const handleLogin = () => {
    if (username !== undefined && username !== '') {
      axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/account/login`, {
        username: username.toLowerCase(), password: password
      }).then(resp => {
        handleOpenSnackbar('Login Successful');
        setHasError(false);
        setErrorMessage('');
        util.addTokenToStorage(resp.data.token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        handleCloseLogin();
      }).catch(resp => {
        setHasError(true);
        setErrorMessage(resp.response.data);
      });
    }
  }

  const handleRegister = () => {
    setUsername('');
    setPassword('');
    handleCloseLogin();
    handleOpenRegister();
  }

  return (
    <Modal
      open={openLoginMenu}
      onClose={handleCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          {hasError ? <Typography className="loginError" component="h2">{errorMessage}</Typography> : ''}
          <FormControl fullWidth>
            <TextField
              label="Username"
              id="usernameInput"
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
              value={username} />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type='password'
              label="Password"
              id="passwordInput"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              value={password} />
          </FormControl>
          <Grid container >
            <Grid item xs={9}>
              <Button variant='outlined' onClick={handleLogin} >
                Login
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleRegister}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Modal>
  )
}

export default LoginComponent;