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


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarComponent />
          <Grid container spacing={1}>
            <Grid item lg={2}>
              <SideNavigationComponent />
            </Grid>
            <Grid item lg={10}>
              <Routes>
                <Route path="/" element={<FeedComponent profileId={1} />} />
                <Route path="/profile" element={<ProfileComponent profileId={1} />} />
              </Routes>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
