import './Stylesheets/App.css'
import { React, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ProfileComponent from './Components/ProfileComponent';
import AppBarComponent from './Components/AppBarComponent';
import SideNavigationComponent from './Components/SideNavigationComponent'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import FeedComponent from './Components/FeedComponent';
import jwt_decode from "jwt-decode";

const util = require('./Utilities/util');

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    const token = util.getTokenFromStorage();
    if (token) {
      const decoded = jwt_decode(token.token);
      setIsLoggedIn(true);
      setProfileId(decoded.profile_node_id);
    } else {
      setIsLoggedIn(false);
      setProfileId('');
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = util.getTokenFromStorage();
      if (token) {
        const decoded = jwt_decode(token.token);
        setIsLoggedIn(true);
        setProfileId(decoded.profile_node_id);
      } else {
        setIsLoggedIn(false);
        setProfileId('');
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} title={"Memory Social"}/>
          <Grid container spacing={1}>
            <Grid item lg={2}>
              <SideNavigationComponent />
            </Grid>
            <Grid item lg={10}>
              <Routes>
                <Route path="/" element={<FeedComponent profileId={profileId} isLoggedIn={isLoggedIn} />} />
                <Route path="/profile" element={<ProfileComponent profileId={profileId} isLoggedIn={isLoggedIn} />} />
              </Routes>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
