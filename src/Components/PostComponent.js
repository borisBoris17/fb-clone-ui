import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Card, Stack, Box, Typography, Button } from '@mui/material';
import { CommentsDisabled, Margin } from '@mui/icons-material';
import CommentComponent from './CommentComponent';

function PostComponent(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (props.post) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
      });
    }
  }, [props.post]);

  return (
    <div className="Profile">
      <Grid container spacing={1}>
        <Grid item justifyContent="flex-start" lg={1}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
            }}
            src={`${config.api.protocol}://${config.api.host}/images/${props.profileData.content.profileImageName}`}
          />
        </Grid>
        <Grid item lg={11}>
          <Typography
            sx={{
              textAlign: "left"
            }}>{props.post.content !== undefined ? props.profileData.content.name : ""}</Typography>
        </Grid>
      </Grid>
      {props.post.content.images.map(image => <Box
            component="img"
            sx={{
              width: '100%',
            }}
            src={`${config.api.protocol}://${config.api.host}/images/${props.profileData.content.profileImageName}`}
          />)}
      <Typography
        sx={{
          textAlign: "left"
        }}>{props.post.content !== undefined ? props.post.content.text : ""}</Typography>
      <Grid container spacing={1}>
        <Grid item justifyContent="flex-start" lg={6}>
          <Button sx={{
            width: "100%"
          }}>Like</Button>
        </Grid>
        <Grid item justifyContent="flex-start" lg={6}>
          <Button sx={{
            width: "100%"
          }}>Comment</Button>
        </Grid>
      </Grid>
      {comments.map(comment => <CommentComponent profileData={props.profileData} comment={comment} />)}
    </div>
  );
}

export default PostComponent;