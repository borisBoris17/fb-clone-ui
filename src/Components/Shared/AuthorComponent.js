import { React } from 'react';
import { Typography, Avatar, Link } from '@mui/material';
import config from '../../config';

function AuthorComponent({ author, timestamp }) {
  return (
    <div className='Author'>
      {author !== undefined && author.content !== undefined ? <><Avatar sx={{ border: '1px solid #cccccc' }} className='authorImage' src={`${config.api.protocol}://${config.api.host}/images/${author.content.profileImageName}`} />
        <div>
          <Link href={`/Friend/${author.node_id}`} underline='none' color="inherit">
            <Typography
              sx={{
                textAlign: "left"
              }}>{author.content !== undefined ? author.content.name : ""}</Typography>
            <Typography
              sx={{
                textAlign: "left",
                color: "#555555",
                fontSize: "12px"
              }}>{new Date(timestamp).toLocaleString()}</Typography>
          </Link>
        </div></> : ""}
    </div>
  )
}

export default AuthorComponent;