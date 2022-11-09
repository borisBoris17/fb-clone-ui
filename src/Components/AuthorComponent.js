import { React } from 'react';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import config from '../config';
import '../Stylesheets/Author.css'

function AuthorComponent({author}) {
  return (
    <div className='Author'>
      {author !== undefined && author.content !== undefined ? <><Avatar className='authorImage' src={`${config.api.protocol}://${config.api.host}/images/${author.content.profileImageName}`} />
      <Typography
        sx={{
          textAlign: "left"
        }}>{author.content !== undefined ? author.content.name : ""}</Typography> </>: ""}
    </div>
  )
}

export default AuthorComponent;