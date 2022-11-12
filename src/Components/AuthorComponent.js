import { React } from 'react';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import config from '../config';
import '../Stylesheets/Author.css'

function AuthorComponent({ author, timestamp }) {
  return (
    <div className='Author'>
      {author !== undefined && author.content !== undefined ? <><Avatar className='authorImage' src={`${config.api.protocol}://${config.api.host}/images/${author.content.profileImageName}`} />
        <div>
          <Typography
            sx={{
              textAlign: "left"
            }}>{author.content !== undefined ? author.content.name : ""}</Typography>
          <Typography
            sx={{
              textAlign: "left",
              color: "#555555",
              fontSize: "12px"
            }}>{new Date(timestamp).toUTCString()}</Typography>
        </div></> : ""}
    </div>
  )
}

export default AuthorComponent;