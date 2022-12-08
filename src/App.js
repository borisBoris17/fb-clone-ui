import './Stylesheets/App.css';
import './Stylesheets/Author.css';
import './Stylesheets/Comment.css';
import './Stylesheets/Feed.css';
import './Stylesheets/Post.css';
import './Stylesheets/Profile.css';
import './Stylesheets/Author.css';
import { React, useEffect, useState, useContext, createContext } from 'react';
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
import axios from 'axios';
import config from './config';

const util = require('./Utilities/util');

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export const ProfileContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (profileId && profileId !== '') {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}`).then(resp => {
        setProfile(resp.data[0]);
      });
    }
  }, [profileId]);

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

  const handleLogOut = () => {
    util.logout();
    setIsLoggedIn(false);
    setProfileId('');
  }

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProfileContext.Provider value={{profile, setProfile}} >
            <AppBarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} title={"Memory Social"} handleLogOut={handleLogOut} />
            <Grid container spacing={1}>
              <Grid item lg={2}>
                <SideNavigationComponent />
              </Grid>
              <Grid item lg={10}>
                <Routes>
                  <Route path="/" element={<FeedComponent profileId={profileId} isLoggedIn={isLoggedIn} />} />
                  <Route path="/profile" element={<ProfileComponent profileId={profileId} isLoggedIn={isLoggedIn} setProfileId={setProfileId} />} />
                </Routes>
              </Grid>
            </Grid>
          </ProfileContext.Provider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
