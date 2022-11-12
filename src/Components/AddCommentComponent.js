import { React, useState } from 'react';
import { Button, TextField, Avatar, Hidden } from '@mui/material';
import config from '../config';

function AddCommentComponent({ profileData, placeholder, handlePostComment, buttonLabel }) {
  const [postText, setPostText] = useState('');

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  }

  const postComment = () => {
    handlePostComment(postText);
    setPostText('');
  }

  return (
    <div className='addComment'>
      <div className='addComment__top'>
        <Avatar
          src={`${config.api.protocol}://${config.api.host}/images/${profileData.content.profileImageName}`}
        />
        <TextField
          className='commentTextField'
          id="outlined-basic"
          variant="outlined"
          placeholder={placeholder}
          size="small"
          value={postText}
          onChange={handlePostTextChange}
          autoComplete='off'
        />
      </div>
      <div className="addComment__bottom">
        <Button
          onClick={postComment}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

export default AddCommentComponent;