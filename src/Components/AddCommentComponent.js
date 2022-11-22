import { React, useState } from 'react';
import { Button, TextField, Avatar, InputAdornment, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import config from '../config';

function AddCommentComponent({ profileData, placeholder, handlePostComment, buttonLabel }) {
  const [postText, setPostText] = useState('');
  const [files, setFiles] = useState([]);

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  }

  const postComment = () => {
    handlePostComment(postText, files);
    setPostText('');
  }

  const handleFileUpload = (event) => {
    console.log("test");
    setFiles(event.target.files);
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
          InputProps={{
            endAdornment: (
              <>
                
                <Button
                  variant="contained"
                  component="label"
                  onChange={handleFileUpload}
                >
                  <input
                  style={{
                    display: "none",
                  }}
                  id="choose-file"
                  type="file"
                />
                    <IconButton
                  style={{
                    pointerEvents: "none",
                  }}
                      aria-label="Upload Images"
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                </Button>
              </>)
          }}

        />
        {/* <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
          />
         */}
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