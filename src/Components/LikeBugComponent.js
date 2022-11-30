import { React } from 'react';
import { Typography } from '@mui/material';

function LikeBugComponent(props) {
  return (
    <div className='postLike'>
      {props.likes.length > 1 ?
        <Typography>{props.likes[0].content.name} and {props.likes.length - 1} other like this Post</Typography> :
        <Typography>{props.likes[0].content.name} likes this Post</Typography>}
    </div>
  )
}

export default LikeBugComponent;