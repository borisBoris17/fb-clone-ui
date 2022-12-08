import { Avatar } from '@mui/material';
import { React, useState } from 'react';
import config from '../config';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProfileDataComponent from './ProfileDataComponent';

function ProfileSummaryComponent({ profileData, setProfileData, setProfileId }) {
  const [numFriends, setNumFriends] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveProfileChanges = async () => {
    const updatedProfile = await axios.put(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileData.node_id}`, {content: profileData.content});
    setProfileData(updatedProfile.data);
    setIsEditMode(false);
  }

  return (
    <div className='profileSummary'>
      {profileData !== undefined && profileData.content !== undefined ?
        <>
          <Avatar sx={{ border: '2px solid #cccccc', width: '25%', height: '25%' }} className='profileImage' src={`${config.api.protocol}://${config.api.host}/images/${profileData.content.profileImageName}`} />
          <div className='profileDataHeader'>
            <Typography
              sx={{
                fontSize: "24pt",
                fontWeight: "bold",
                color: "#808080",
                textAlign: "left"
              }}>{profileData.content !== undefined ? profileData.content.name : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: "bold",
                color: "#cccccc",
                textAlign: "left"
              }}>{numFriends} Friends
            </Typography>
          </div>
          <div className='break'></div>
          <div className='profileDataDetails'>
            <ProfileDataComponent profileData={profileData} setProfileData={setProfileData} setProfileId={setProfileId} isEditMode={isEditMode}/>
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