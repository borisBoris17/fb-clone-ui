import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Box, Typography, Button } from '@mui/material';
import CommentComponent from './CommentComponent';
import AuthorComponent from './AuthorComponent';
import LikeBugComponent from './LikeBugComponent';
import CommentBugComponent from './CommentBugComponent';
import AddCommentComponent from './AddCommentComponent';
import '../Stylesheets/Post.css'

function PostComponent({post, profileData}) {
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (post) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/relation/${post.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${post.node_id}/Authored_by/Profile`).then(resp => {
        setAuthor(resp.data[0]);
      });
    }
  }, [post]);

  function toggleShowComments() {
    setShowComments(!showComments);
  }

  function showCommentsIfNotShown() {
    if (!showComments) {
      setShowComments(!showComments);
    }
  }

  const handleCreateNewComment = async (commentText) => {
    const comment = createCommentObject(commentText);
    const savedComment = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/node/`, comment);
    const commentRelation = createRelationObject(post.node_id, savedComment.data.node_id, 'Comment');
    const authoredRelation = createRelationObject(profileData.node_id, savedComment.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedComment.data.node_id, profileData.node_id, 'Authored_by');
    const savedCommentRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, commentRelation);
    const savedAuthoredRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredRelation);
    const savedAuthoredByRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
    });
  }

  const handleLikePost = async () => {
    const likeRelation = createRelationObject(profileData.node_id, post.node_id, 'Like');
    const likedByRelation = createRelationObject(post.node_id, profileData.node_id, 'Liked_by');
    const savedLikeRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, likeRelation);
    const savedLikedByRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, likedByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/relation/${post.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
    });
  }

  const createCommentObject = (commentText) => {
    return {
      node_type: "Comment",
      content: {
        text: commentText
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
    <div className="Post">
      <AuthorComponent author={author} timestamp={post !== undefined ? post.created_at : ""} />
      <Typography
        sx={{
          textAlign: "left",
          margin: '2%',
        }}>{post.content !== undefined ? post.content.text : ""}
      </Typography>
      {post.content.images.map((image, index) => <Box
        key={index}
        component="img"
        sx={{
          width: '100%',
        }}
        src={`${config.api.protocol}://${config.api.host}/images/${image}`}
      />)}
      <div className="postInteractions">
        {likes.length > 0 ? <LikeBugComponent likes={likes} /> : ''}
        {comments.length > 0 ? <CommentBugComponent toggleShowComments={toggleShowComments} comments={comments} /> : ''}
      </div>
      <div className='buttonDiv'>
        <Button onClick={handleLikePost}>Like</Button>
        <Button sx={{
          width: "100%"
        }}
          onClick={showCommentsIfNotShown}>Comment</Button>
      </div>
      {showComments ? comments.map(comment => (<CommentComponent key={comment.node_id} profileData={profileData} comment={comment} />)) : ''}
      <AddCommentComponent profileData={profileData} placeholder="Write a comment..." buttonLabel="Comment" handlePostComment={handleCreateNewComment} />
    </div>
  );
}

export default PostComponent;