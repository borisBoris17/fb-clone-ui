import { Avatar, IconButton } from '@mui/material';
import { React, useContext, useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProfileDataComponent from './ProfileDataComponent';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AppContext } from '../../App';
import UpdateProfileImageComponent from './UpdateProfileImageComponent';

function ProfileSummaryComponent({ isLoggedInProfile }) {
  const [numFriends, setNumFriends] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openUpdateProfileImageMenu, setOpenUpdateProfileImageMenu] = useState(false);
  const { profile, setProfile, handleOpenSnackbar } = useContext(AppContext);

  useEffect(() => {
    if (profile.node_id !== undefined) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${profile.node_id}/Friend`).then(resp => {
        if (resp.data !== undefined && resp.data !== "") {
          setNumFriends(resp.data.length);
        }
      });
    }
  }, [profile.node_id])

  const handleSaveProfileChanges = async () => {
    const updatedProfile = await axios.put(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profile.node_id}`, { content: profile.content });
    setProfile(updatedProfile.data);
    setIsEditMode(false);
  }

  const handleOpenUpdateProfileImageMenu = () => setOpenUpdateProfileImageMenu(true);
  const handleCloseUpdateProfileImageMenu = () => {
    setOpenUpdateProfileImageMenu(false);
    axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profile.node_id}`).then(resp => {
      setProfile(resp.data);
    });
  }

  return (
    <div className='profileSummary'>
      {profile !== undefined && profile.content !== undefined ?
        <>
          <Avatar sx={{ border: '2px solid #cccccc', width: '25%', height: '25%' }} className='profileImage' src={profile.content !== undefined ? `${config.api.protocol}://${config.api.host}/images/${profile.node_id}/profile/${profile.content.profileImageName}` : ''} />
          <div className='profileDataHeader'>
            <Typography
              sx={{
                fontSize: "24pt",
                fontWeight: "bold",
                color: "#808080",
                textAlign: "left"
              }}>{profile.content !== undefined ? profile.content.name : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: "bold",
                color: "#cccccc",
                textAlign: "left"
              }}>{numFriends} Friends
            </Typography>
            {isEditMode ? "" : <Button onClick={handleOpenUpdateProfileImageMenu}>Update Profile Image</Button>}
            <UpdateProfileImageComponent openUpdateProfileImageMenu={openUpdateProfileImageMenu} handleOpenUpdateProfileImageMenu={handleOpenUpdateProfileImageMenu} handleCloseUpdateProfileImageMenu={handleCloseUpdateProfileImageMenu} />
          </div>
          <div className='break'></div>
          <div className='profileDataDetails'>
            <ProfileDataComponent isEditMode={isEditMode} />
          </div>
          <div className='break'></div>
          <div className='profileButtons'>
            {isEditMode ? <Button className='editProfileButton' onClick={handleSaveProfileChanges}>Save</Button> : <Button className='editProfileButton' onClick={() => setIsEditMode(true)}>Edit Profile</Button>}
          </div>

        </> : ""}
    </div>
  )
}

export default ProfileSummaryComponent;