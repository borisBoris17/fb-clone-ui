import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Card, Typography } from '@mui/material';
import PostComponent from './PostComponent';
import '../Stylesheets/Feed.css';
import AuthorComponent from './AuthorComponent';
import AddCommentComponent from './AddCommentComponent';

function FeedComponent(props) {
  const [profileData, setProfileData] = useState({});
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.profileId) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.profileId}`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.profileId}/Friend/Profile`).then(resp => {
        setFriends(resp.data);
      })
    }
  }, [props.profileId]);

  useEffect(() => {
    if (friends) {
      friends.map(friend => {
        axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${friend.node_id}/Authored/Post`).then(resp => {
          let alreadyInPosts = false;
          posts.map(post => {
            if (post.node_id === resp.data[0].node_id) {
              alreadyInPosts = true;
            }
          })
          if (!alreadyInPosts) {
            setPosts(current => [...current, resp.data[0]]);
          }
        });
      })
    }
  }, [friends]);

  return (
    <div className="Feed">
      <Grid container spacing={1}>
        <Grid item lg={8}>
          <Card className="postsCard">
            <div className="createPost">
              {profileData.content !== undefined ? <AddCommentComponent profileData={profileData} placeholder={`What is on your mind, ${profileData.content.name}?`} /> : ''}
            </div>
          </Card>
          {posts.map(post =><Card className="postsCard"> <PostComponent profileData={profileData} post={post} /></Card>)}
        </Grid>
        <Grid item lg={4}>
          <Card sx={{
            width: "100%",
            minHeight: '50vw'
          }}>

          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default FeedComponent;