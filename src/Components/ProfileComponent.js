import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Grid, Card, Typography } from '@mui/material';
import PostComponent from './PostComponent';

function ProfileComponent({profileId, isLoggedIn}) {
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (profileId) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}/Authored/Post`).then(resp => {
        setPosts(resp.data);
      })
    }
  }, [profileId]);

  return (
    <div>
      {isLoggedIn !== undefined ?
        <div className="Profile">
          <Grid container spacing={1}>
            <Grid item lg={8}>
              <Card className="Posts" sx={{
                width: "100%",
                padding: "0%",
                margin: "0%",
              }}>
                {posts.map(post => <PostComponent key={post.node_id} profileData={profileData} post={post} />)}
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
        :
        <div className="feed">
          <div>
            <Card className="postsCard">
              <div className="missingProfileMessageDiv">No profile loaded, make sure you are logged in...
              </div>
            </Card>
          </div>
          <div>
            <Card className="sideComponent">

            </Card>
          </div>
        </div>}
    </div>
  );
}

export default ProfileComponent;