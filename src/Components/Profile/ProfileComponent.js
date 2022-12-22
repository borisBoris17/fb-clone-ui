import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { Card } from '@mui/material';
import PostListComponent from '../Shared/PostListComponent';
import ProfileSummaryComponent from './ProfileSummaryComponent';
import { AppContext } from '../../App';
import LoadingPostComponent from '../Shared/LoadingPostComponent';

function ProfileComponent({ isLoggedIn }) {
  const [posts, setPosts] = useState([]);
  const { profile, isLoading, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    if (profile.node_id) {
      setIsLoading(true);
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profile.node_id}/Authored/Post`).then(resp => {
        setPosts(resp.data);
        setIsLoading(false);
      })
    }
  }, [profile.node_id, setIsLoading]);

  return (
    <div className="profileComponent">
      {isLoggedIn !== undefined && isLoggedIn ? <>
        <div className="profile">
            {isLoading ? <Card key="-1" className="postsCard"><LoadingPostComponent /></Card> : ""}
            {posts !== undefined && posts.length > 1 ? <PostListComponent posts={posts} /> : ""}
        </div>
        <div className='profileSideComponent'>
          <Card>
            <ProfileSummaryComponent />
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