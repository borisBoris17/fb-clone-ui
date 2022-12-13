import { React } from 'react';
import { Card } from '@mui/material';
import PostComponent from './PostComponent';

function PostListComponent({ posts }) {

  return (
    <div>
      {posts.map(post => <Card key={post.node_id} className="postsCard"><PostComponent post={post} /></Card>)}
    </div>
  );
}

export default PostListComponent;