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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.profileId) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${props.profileId}`).then(resp => {
        setProfileData(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/feed/${props.profileId}`).then(resp => {
        setPosts(resp.data)
      });
    }
  }, [props.profileId]);

  const handleCreateNewPost = async (postText) => {
    const post = createPostObject(postText);
    const savedPost = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/node/`, post);
    const authoredRelation = createRelationObject(profileData.node_id, savedPost.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedPost.data.node_id, profileData.node_id, 'Authored_by');
    const savedAuthoredRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredRelation);
    const savedAuthoredByRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/feed/${props.profileId}`).then(resp => {
      setPosts(resp.data)
    });
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
    <div className="feed">
      <div>
        <Card className="postsCard">
          <div className="createPost">
            {profileData.content !== undefined ? <AddCommentComponent profileData={profileData} placeholder={`What is on your mind, ${profileData.content.name}?`} buttonLabel="Post" handlePostComment={handleCreateNewPost} /> : ''}
          </div>
        </Card>
        {posts.map(post => <Card className="postsCard" > <PostComponent profileData={profileData} post={post} /></Card>)}
      </div>
      <div>
        <Card className="sideComponent">
          
        </Card>
      </div>
    </div>
  );
}

export default FeedComponent;