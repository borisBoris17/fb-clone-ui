import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Card } from '@mui/material';
import PostListComponent from './PostListComponent';

function ProfileComponent({ profileId, isLoggedIn }) {
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
    <div className="profileComponent">
      {isLoggedIn !== undefined && isLoggedIn ? <>
        <div className="profile">
            {posts !== undefined && posts.length > 1 ? <PostListComponent profileData={profileData} posts={posts} /> : ""}
        </div>
        <div className='profileSideComponent'>
          <Card>
            asdfe
          </Card>
        </div>
      </> : <>
        <div className="profile">
            <Card className="postsCard">
              <div className="missingProfileMessageDiv">No profile loaded, make sure you are logged in...</div>
            </Card>
        </div>
        <div className="profileSideComponent">
        <Card>
          asdfe
        </Card>
      </div> </>}
    </div>
  );
}

export default ProfileComponent;