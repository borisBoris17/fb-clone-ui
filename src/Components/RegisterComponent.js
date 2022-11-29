import { React, useState } from 'react';
import { FormControl, Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const config = require('../config');
const util = require('../Utilities/util');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function RegisterComponent({ setIsLoggedIn, handleCloseRegister, openRegisterMenu }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/account/register`, {
      username: username, password: password, email: email, name: name
    }).then(resp => {
      if (resp.data.token === undefined) { 
        setHasError(true);
        setErrorMessage(resp.data);
      } else {
        setHasError(false);
        setErrorMessage('');
        util.addTokenToStorage(resp.data.token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        setEmail('');
        handleCloseRegister();
      }
    })
  }

  return (
    <Modal
      open={openRegisterMenu}
      onClose={handleCloseRegister}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register
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
          <FormControl fullWidth>
            <TextField
              label="Name"
              id="nameInput"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
              value={name} />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Email"
              id="emailInput"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              value={email} />
          </FormControl>
          <Button onClick={handleRegister}>
            Register
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default RegisterComponent;