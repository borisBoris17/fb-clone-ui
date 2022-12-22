import { React, useContext, useState, useRef } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { AppContext } from '../../App';
const config = require('../../config');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function UpdateProfileImageComponent({ openUpdateProfileImageMenu, handleOpenUpdateProfileImageMenu, handleCloseUpdateProfileImageMenu }) {
  const [file, setFile] = useState(undefined);
  const fileUpload = useRef();
  const { handleOpenSnackbar, profile } = useContext(AppContext);

  const handleSelectImage = (event) => {
    console.log(fileUpload.current);
    const files = [...event.target.files];
    if (files.length > 0) {
      setFile(files[0]);
    }
  }

  const handleProfileImageUpload = (event) => {
    if (file !== undefined) {
      var formData = new FormData();
      formData.append("profileImageUpdate", true);
      formData.append("profileId", profile.node_id);
      formData.append("image", file);
      axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/node/uploadProfileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        handleOpenSnackbar('Profile Image Changed.');
        setFile(undefined);
        handleCloseUpdateProfileImageMenu();
      });
    }
  }

  return (
    <Modal
      open={openUpdateProfileImageMenu}
      onClose={handleCloseUpdateProfileImageMenu}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack spacing={3}>
          <Typography variant="h6" component="h2">
            Update Profile Image
          </Typography>
          {file !== undefined ? <img
            className='addedImage' src={URL.createObjectURL(file)} alt="preview" /> : ""}
          <Button onClick={() => fileUpload.current.click()} endIcon={<AddPhotoAlternateIcon />}>
            <input
              ref={fileUpload}
              hidden
              name="images"
              type="file"
              onChange={handleSelectImage}
            />
            Select Image
          </Button>
          <Button onClick={handleProfileImageUpload}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default UpdateProfileImageComponent;