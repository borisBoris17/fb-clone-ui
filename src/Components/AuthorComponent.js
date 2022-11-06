import {React} from 'react';
import { Grid, Box, Typography } from '@mui/material';
import config from '../config';

function AuthorComponent(props) {
  return (
    <div className='Author'>
      <Grid container spacing={1}>
        <Grid item justifyContent="flex-start" lg={1}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
            }}
            src={`${config.api.protocol}://${config.api.host}/images/${props.profileData.content.profileImageName}`}
          />
        </Grid>
        <Grid item lg={11}>
          <Typography
            sx={{
              textAlign: "left"
            }}>{props.profileData.content !== undefined ? props.profileData.content.name : ""}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default AuthorComponent;