import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Card, Stack, Box, Typography, Button } from '@mui/material';
import { CommentsDisabled, Margin } from '@mui/icons-material';
import CommentComponent from './CommentComponent';
import AuthorComponent from './AuthorComponent';
import LikeBugComponent from './LikeBugComponent';
import CommentBugComponent from './CommentBugComponent';
import AddCommentComponent from './AddCommentComponent';

function PostComponent(props) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (props.post) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/relation/${props.post.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
      });
    }
  }, [props.post]);

  function toggleShowComments() {
    setShowComments(!showComments);
  }

  return (
    <div className="Post">
      <AuthorComponent profileData={props.profileData} />
      <Typography
        sx={{
          textAlign: "left",
          margin: '2%',
        }}>{props.post.content !== undefined ? props.post.content.text : ""}
      </Typography>
      {props.post.content.images.map(image => <Box
        component="img"
        sx={{
          width: '100%',
        }}
        src={`${config.api.protocol}://${config.api.host}/images/${props.profileData.content.profileImageName}`}
      />)}
      <Grid container spacing={1}>
        <Grid item justifyContent="flex-start" lg={10}>
          {likes.length > 0 ? <LikeBugComponent likes={likes} /> : ''}
        </Grid>
        <Grid item justifyContent="flex-end" lg={2}>
          {comments.length > 0 ? <CommentBugComponent toggleShowComments={toggleShowComments} comments={comments} /> : ''}
        </Grid>
      </Grid>
      <div className='buttonDiv'>
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
      </div>
      {showComments ? comments.map(comment => (<div><CommentComponent profileData={props.profileData} comment={comment} />
      <AddCommentComponent profileData={props.profileData} /></div> )) : ''}
    </div>
  );
}

export default PostComponent;