import { Avatar } from '@mui/material';
import { React, useContext, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import FriendDataComponent from './FriendDataComponent';

function FriendSummaryComponent({ isLoggedInProfile, profile }) {
  const [numFriends, setNumFriends] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddFriend = async () => {
    // TODO change to creating a friend request
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
            <FriendDataComponent profile={profile} />
          </div>
          <div className='break'></div>
          <div className='profileButtons'>
            <Button className='editProfileButton' onClick={handleAddFriend}>Add as Friend</Button>
          </div>
          
        </> : ""}
    </div>
  )
}

export default FriendSummaryComponent;