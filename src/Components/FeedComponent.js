import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Card } from '@mui/material';
import PostComponent from './PostComponent';
import '../Stylesheets/Feed.css';
import AddCommentComponent from './AddCommentComponent';

function FeedComponent({ profileId, isLoggedIn }) {
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (profileId && profileId !== '') {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${profileId}`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/feed/${profileId}`).then(resp => {
        setPosts(resp.data)
      });
    }
  }, [profileId]);

  const handleCreateNewPost = async (postText, files) => {
    const post = createPostObject(postText);
    const savedPost = await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/node/`, post);
    const authoredRelation = createRelationObject(profileData.node_id, savedPost.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedPost.data.node_id, profileData.node_id, 'Authored_by');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredByRelation);
    var formData = new FormData();
    formData.append("postId", savedPost.data.node_id);
    formData.append("profileId", profileData.node_id);
    files.forEach(file => {
      formData.append("images", file);
    })
    axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/node/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/feed/${profileId}`).then(resp => {
        setPosts(resp.data)
      });
    })
  }

  const createPostObject = (postText) => {
    return {
      node_type: "Post",
      content: {
        text: postText,
        images: []
      }
    }
  }

  const createRelationObject = (sourceId, destId, type) => {
    return {
      source_id: sourceId,
      dest_id: destId,
      relation_type: type,
      content: null
    }
  }

  return (
    <div >
      {isLoggedIn && profileData.content !== undefined ?
        <div className="feed">
          <div>
            <Card className="postsCard">
              <div className="createPost">
                {profileData.content !== undefined ? <AddCommentComponent profileData={profileData} placeholder={`What is on your mind, ${profileData.content.name}?`} buttonLabel="Post" handlePostComment={handleCreateNewPost} /> : ''}
              </div>
            </Card>
            {posts.map(post => <Card key={post.node_id} className="postsCard" > <PostComponent profileData={profileData} post={post} /></Card>)}
          </div>
          <div>
            <Card className="sideComponent">

            </Card>
          </div>
        </div> :
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

export default FeedComponent;