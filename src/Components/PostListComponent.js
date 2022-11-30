import { React } from 'react';
import { Card } from '@mui/material';
import PostComponent from './PostComponent';

function PostListComponent({ profileData, posts }) {

  return (
    <div>
      {posts.map(post => <Card key={post.node_id} className="postsCard" > <PostComponent profileData={profileData} post={post} /></Card>)}
    </div>
  );
}

export default PostListComponent;