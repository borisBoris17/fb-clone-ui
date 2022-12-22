import { Avatar } from '@mui/material';
import { React, useContext, useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import FriendDataComponent from './FriendDataComponent';
import { AppContext } from '../../App';
const util = require('../../Utilities/util');

function FriendSummaryComponent({ profile }) {
  const [numFriends, setNumFriends] = useState(1);
  const [isFriend, setIsFriend] = useState(false);
  const [shouldConfirmRequest, setShouldConfirmRequest] = useState(false);
  const [canAddFriend, setCanAddFriend] = useState(false);
  const { profile: loggedInUser, handleOpenSnackbar } = useContext(AppContext);

  useEffect(() => {
    if (profile.node_id && loggedInUser.node_id) {
      if (profile.node_id === loggedInUser.node_id) {
        setCanAddFriend(false);
        setIsFriend(true);
      } else {
        axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/getFriendRequest/${profile.node_id}/${loggedInUser.node_id}`).then(resp => {
          const foundFriendRequest = resp.data;
          if (foundFriendRequest !== undefined && foundFriendRequest !== "") {
            if ((foundFriendRequest.content === undefined || foundFriendRequest.content === null) || (foundFriendRequest.content !== undefined && foundFriendRequest.content !== null && foundFriendRequest.content.isProcessed !== true)) {
              setShouldConfirmRequest(true);
            }
          } else {
            setCanAddFriend(true);
          }
        });
        axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/getFriend/${loggedInUser.node_id}/${profile.node_id}`).then(resp => {
          console.log(resp.data);
          if (resp.data !== undefined && resp.data !== "") {
            setIsFriend(true);
          }
        });
      }
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${profile.node_id}/Friend`).then(resp => {
        if (resp.data !== undefined && resp.data !== "") {
          setNumFriends(resp.data.length);
        }
      });
    }
  }, [profile.node_id, loggedInUser.node_id]);

  const handleSendFriendRequest = async () => {
    const friendRequestRelation = util.createRelationObject(loggedInUser.node_id, profile.node_id, 'Friend_request');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/sendFriendRequest`, friendRequestRelation);
    handleOpenSnackbar('Friend Request Sent!');
  }

  const handleConfirmFriend = async () => {
    const confirmFriendObject = createConfirmFriendObject(profile.node_id, loggedInUser.node_id);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/confirmFriendRequest`, confirmFriendObject);
    handleOpenSnackbar('Friend Confirmed!');
  }

  const createConfirmFriendObject = (profileId, loggedInId) => {
    return {
      requestSourceId: profileId,
      requestTargetId: loggedInId,
      content: null
    }
  }

  return (
    <div className='profileSummary'>
      {profile !== undefined && profile.content !== undefined ?
        <>
          <Avatar sx={{ border: '2px solid #cccccc', width: '130px', height: '130px' }} className='profileImage' src={`${config.api.protocol}://${config.api.host}/images/${profile.node_id}/profile/${profile.content.profileImageName}`} />
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
            {shouldConfirmRequest ? <Button className='editProfileButton' onClick={handleConfirmFriend}>Confirm Friend</Button> : ""}
            {canAddFriend && !isFriend ? <Button className='editProfileButton' onClick={handleSendFriendRequest}>Send Friend Request</Button> : ""}
          </div>
        </> : ""}
    </div>
  )
}

export default FriendSummaryComponent;