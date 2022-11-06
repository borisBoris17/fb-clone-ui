import { React } from 'react';
import { Button } from '@mui/material';

function CommentBugComponent(props) {
  return (
    <div>
      {props.comments.length > 0 ? <Button onClick={props.toggleShowComments}>{props.comments.length} Comments</Button> : ''}
    </div>
  )
}

export default CommentBugComponent;