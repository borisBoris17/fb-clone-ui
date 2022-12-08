import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { Card } from '@mui/material';
import PostListComponent from './PostListComponent';
import ProfileSummaryComponent from './ProfileSummaryComponent';
import { ProfileContext } from '../App';

function ProfileComponent({ isLoggedIn, setProfileId }) {
  const [posts, setPosts] = useState([]);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    if (profile.node_id) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profile.node_id}/Authored/Post`).then(resp => {
        setPosts(resp.data);
      })
    }
  }, [profile.node_id]);

  return (
    <div className="profileComponent">
      {isLoggedIn !== undefined && isLoggedIn ? <>
        <div className="profile">
            {posts !== undefined && posts.length > 1 ? <PostListComponent posts={posts} /> : ""}
        </div>
        <div className='profileSideComponent'>
          <Card>
            <ProfileSummaryComponent setProfileId={setProfileId} />
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