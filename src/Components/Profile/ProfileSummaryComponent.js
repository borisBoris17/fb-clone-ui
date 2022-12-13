import { Avatar } from '@mui/material';
import { React, useContext, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import ProfileDataComponent from './ProfileDataComponent';
import { AppContext } from '../../App';

function ProfileSummaryComponent({isLoggedInProfile}) {
  const [numFriends, setNumFriends] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const { profile, setProfile } = useContext(AppContext);

  const handleSaveProfileChanges = async () => {
    const updatedProfile = await axios.put(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profile.node_id}`, {content: profile.content});
    setProfile(updatedProfile.data);
    setIsEditMode(false);
  }

  const getFriendProfileComponent = () => {
    return (
      <Button className='editProfileButton' onClick={handleSaveProfileChanges}>Add as Friend</Button>
    )
  }

  return (
    <div className='profileSummary'>
      {profile !== undefined && profile.content !== undefined ?
        <>
          <Avatar sx={{ border: '2px solid #cccccc', width: '25%', height: '25%' }} className='profileImage' src={`${config.api.protocol}://${config.api.host}/images/${profile.content.profileImageName}`} />
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
          </div>
          <div className='break'></div>
          <div className='profileDataDetails'>
            <ProfileDataComponent isEditMode={isEditMode}/>
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