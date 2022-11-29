import { React, useState } from 'react';
import { Button, TextField, Avatar, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
    setFiles([]);
  }

  const handleFileUpload = (event) => {
    setFiles([...event.target.files]);
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
                <IconButton
                  aria-label="upload"
                  component="label"
                >
                  <AddPhotoAlternateIcon />
                  <input
                    hidden
                    name="images"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </IconButton>
              </>
            ),
          }}
        />

      </div>
      <div className="addComment__middle">
        {files.length > 0 ? <img
          className='addedImage' src={URL.createObjectURL(files[0])} alt="preview" /> : ""}
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