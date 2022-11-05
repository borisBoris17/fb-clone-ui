import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Button, Stack, Box, Typography } from '@mui/material';
import ReplyComponent from './ReplyComponent';

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
          <Grid container spacing={2}>
            <Grid item justifyContent="flex-start" lg={1}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: 40 / 2,
                }}
                src={`${config.api.protocol}://${config.api.host}/images/${profileData.content.profileImageName}`}
              />
            </Grid>
            <Grid item lg={10}>
              <Typography
                sx={{
                  textAlign: "left"
                }}>{profileData.content !== undefined ? profileData.content.name : ""}</Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              textAlign: "left"
            }}>{props.comment.content !== undefined ? props.comment.content.text : ""}</Typography>
            <Grid container spacing={1}>
            <Grid item justifyContent="flex-start" lg={2}>
              <Button varient="text" size="small" sx={{
                width: "100%"
              }}>Like</Button>
            </Grid>
            <Grid item justifyContent="flex-start" lg={2}>
              <Button varient="text" size="small" sx={{
                width: "100%"
              }}>Comment</Button>
            </Grid>
          </Grid>
          {replies.map(reply => <ReplyComponent reply={reply} />)}
        </Box> : ""}
    </div>
  );
}

export default CommentComponent;