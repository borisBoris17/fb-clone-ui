import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Button, Stack, Box, Typography } from '@mui/material';
import ReplyComponent from './ReplyComponent';
import AuthorComponent from './AuthorComponent';
import '../Stylesheets/Comment.css'

function CommentComponent(props) {
  const [profileData, setProfileData] = useState({});
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (props.comment.node_id) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.comment.node_id}/Authored_by/Profile`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.comment.node_id}/Comment/Comment`).then(resp => {
        setReplies(resp.data);
      });
    }
  }, []);

  return (
    <div className="Comment">
      {profileData.content !== undefined ?
        <Box className="Comments" >
          <AuthorComponent profileData={profileData}/>
          <Typography
            sx={{
              textAlign: "left",
              margin: '2%',
              padding: '1%',
              background: '#121212',
              borderRadius: '15pt'
            }}>{props.comment.content !== undefined ? props.comment.content.text : ""}</Typography>
            <div className="commentInterations">
              <Button varient="text" size="small">Like</Button>
              <Button varient="text" size="small" >Comment</Button>
            </div>
          {replies.map(reply => <ReplyComponent reply={reply} />)}
        </Box> : ""}
    </div>
  );
}

export default CommentComponent;