import React, { useState, useContext, useRef, useEffect } from 'react';
import { Card, Stack, Box, Typography, TextField, FormControl, Grid, Button } from '@mui/material';
import config from '../../config';
import axios from 'axios';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
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

const LoginPageComponent = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleOpenSnackbar } = useContext(AppContext);
  const navigate = useNavigate();
  const usernameRef = useRef();


  useEffect(() => {
    usernameRef.current.focus();
  }, [])

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
        navigate(-1);
      }).catch(resp => {
        setHasError(true);
        setErrorMessage(resp.response.data);
      });
    }
  }

  const handleRegister = () => {
    if (username !== undefined && username !== '') {
      axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/account/register`, {
        username: username.toLowerCase(), password: password, email: email, name: name
      }).then(resp => {
        if (resp.data.token === undefined) {
          setHasError(true);
          setErrorMessage(resp.data);
        } else {
          handleOpenSnackbar('Registration Successful with Username: ' + resp.data.username);
          setHasError(false);
          setErrorMessage('');
          util.addTokenToStorage(resp.data.token);
          setIsLoggedIn(true);
          setUsername('');
          setPassword('');
          setName('');
          setEmail('');
          navigate(-1);
        }
      })
    }
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    handleLogin();
  }

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    handleRegister();
  }

  const handleClickRegister = () => {
    console.log(isRegister);
    setIsRegister(isRegister => !isRegister);
  }

  return (
    <div className="feedComponent">
      <div className="feed">
        <Card className="postsCard">
          <Box sx={modalStyle}>
            <form>
              <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {isRegister ? "Register" : "Login"}
                </Typography>
                {hasError ? <Typography className="loginError" component="h2">{errorMessage}</Typography> : ''}
                <FormControl fullWidth>
                  <TextField
                    label="Username"
                    inputRef={usernameRef}
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
                {isRegister ? <><FormControl fullWidth>
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
                </FormControl></> : ""}
                <Grid container >
                  <Grid item xs={9}>
                    {isRegister ? <Button type='submit' variant='outlined' onClick={handleSubmitRegister} >
                      Register
                    </Button> : <Button type='submit' variant='outlined' onClick={handleSubmitLogin} >
                      Login
                    </Button>}
                  </Grid>
                  <Grid item xs={3}>
                     <Button onClick={handleClickRegister}>
                    {isRegister ? "Cancel" : "Register"}
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </form>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default LoginPageComponent;