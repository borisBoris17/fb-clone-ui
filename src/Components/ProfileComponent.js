import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Card, Typography } from '@mui/material';
import PostComponent from './PostComponent';

function ProfileComponent(props) {
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.profileId) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.profileId}`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.profileId}/Authored/Post`).then(resp => {
        setPosts(resp.data);
      })
    }
  }, [props.profileId]);

  return (
    <div className="Profile">
      <Grid container spacing={1}>
        <Grid item lg={8}>
          <Card className="Posts" sx={{
            width: "100%",
            padding: "0%",
            margin: "0%",
          }}>
            {posts.map(post => <PostComponent profileData={profileData} post={post} />)}
          </Card>
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

export default ProfileComponent;