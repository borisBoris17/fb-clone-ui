import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { Card } from '@mui/material';
import PostListComponent from '../Shared/PostListComponent';
import { useParams } from "react-router-dom";
import FriendSummaryComponent from './FriendSummaryComponent';

function FriendComponent({ isLoggedIn, isFriendRequest }) {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const { profileId } = useParams();

  useEffect(() => {
    if (profileId && profileId !== '') {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}`).then(resp => {
        setProfile(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}/Authored/Post`).then(resp => {
        setPosts(resp.data);
      });
    }
  }, [profileId]);

  return (
    <div className="profileComponent">
      {isLoggedIn !== undefined && isLoggedIn ? <>
        <div className="profile">
            {posts !== undefined && posts.length > 0 ? <PostListComponent posts={posts} /> : ""}
        </div>
        <div className='profileSideComponent'>
          <Card>
            <FriendSummaryComponent profile={profile} isFriendRequest={isFriendRequest} />
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

export default FriendComponent;