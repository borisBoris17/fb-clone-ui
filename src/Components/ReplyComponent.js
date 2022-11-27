import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Box, Typography, Button } from '@mui/material';
import AuthorComponent from './AuthorComponent';
import '../Stylesheets/Reply.css'

const ReplyComponent = (props) => {
  const [profileData, setProfileData] = useState({});
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (props.reply.node_id) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${props.reply.node_id}/Authored_by/Profile`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${props.reply.node_id}/Comment/Comment`).then(resp => {
        setReplies(resp.data);
      });
    }
  }, []);

  return (
    <div className='Reply'>
      {profileData.content !== undefined ?
      <Box>
      <AuthorComponent author={profileData} timestamp={props.reply !== undefined ? props.reply.created_at : ""} />
      <Typography
            sx={{
              textAlign: "left",
              margin: '2%',
              padding: '1%',
              background: '#121212',
              borderRadius: '15pt'
            }}>{props.reply.content !== undefined ? props.reply.content.text : ""}</Typography>
            <div className="replyInterations">
              <Button varient="text" size="small">Like</Button>
              <Button varient="text" size="small" >Comment</Button>
            </div>
          {replies.map(reply => <ReplyComponent reply={reply} />)}
      </Box>: "" }
    </div>
  )
}

export default ReplyComponent;