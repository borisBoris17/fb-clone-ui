import './Stylesheets/App.css'
import { React, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import ProfileComponent from './Components/ProfileComponent';
import AppBarComponent from './Components/AppBarComponent';
import SideNavigationComponent from './Components/SideNavigationComponent'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import { black } from '@mui/material/colors';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { palette } from '@mui/system';
import { purple } from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";

// const theme = createTheme({
//   palette: {
//     background: {
//       default: "#171717"
//     },
//     primary: {
//       main: '#444444'
//     },
//     secondary: {
//       main: '#171717'
//     },
//     text: {
//       main: '#000000'
//     },
//     error: {
//       main: '#DA0037'
//     }
//   }
// });


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBarComponent />
        <Grid container spacing={1}>
          <Grid item lg={2}>
            <SideNavigationComponent />
          </Grid>
          <Grid item lg={10}>
            <ProfileComponent profileId={1} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
