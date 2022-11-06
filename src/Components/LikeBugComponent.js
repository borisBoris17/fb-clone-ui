import { React } from 'react';
import { Typography } from '@mui/material';

function LikeBugComponent(props) {
  return (
    <div>
      {props.likes.length > 1 ? <Typography
        sx={{
          textAlign: "left",
          margin: '2%',
        }}>{props.likes[0].content.name} and {props.likes.length - 1} other like this Post</Typography> : <Typography
          sx={{
            textAlign: "left",
            margin: '2%',
          }}>{props.likes[0].content.name} likes this Post</Typography>}
    </div>
  )
}

export default LikeBugComponent;