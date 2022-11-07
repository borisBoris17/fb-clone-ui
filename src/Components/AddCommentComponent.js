import { React } from 'react';
import { Grid, Box, TextField } from '@mui/material';
import config from '../config';

function AddCommentComponent(props) {

  return (
    <div className='AddComment'>
      <Grid container>
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
          <TextField className='commentTextField' sx={{
            width: '98%',
          }} id="outlined-basic" variant="outlined" placeholder="Write a comment..." size="small"/>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddCommentComponent;