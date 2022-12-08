import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { Box, Typography, Button } from '@mui/material';
import CommentComponent from './CommentComponent';
import AuthorComponent from './AuthorComponent';
import LikeBugComponent from './LikeBugComponent';
import CommentBugComponent from './CommentBugComponent';
import AddCommentComponent from './AddCommentComponent';
import { ProfileContext } from '../App';

function PostComponent({post}) {
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    if (post) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${post.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${post.node_id}/Authored_by/Profile`).then(resp => {
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
    const savedComment = await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/node/`, comment);
    const commentRelation = createRelationObject(post.node_id, savedComment.data.node_id, 'Comment');
    const authoredRelation = createRelationObject(profile.node_id, savedComment.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedComment.data.node_id, profile.node_id, 'Authored_by');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, commentRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${post.node_id}/Comment/Comment`).then(resp => {
        setComments(resp.data);
    });
  }

  const handleLikePost = async () => {
    const likeRelation = createRelationObject(profile.node_id, post.node_id, 'Like');
    const likedByRelation = createRelationObject(post.node_id, profile.node_id, 'Liked_by');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, likeRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, likedByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${post.node_id}/Liked_by`).then(resp => {
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
      {post.content.images !== undefined ? post.content.images.map((image, index) => <Box
        key={index}
        component="img"
        className="postImages"
        src={`${config.api.protocol}://${config.api.host}/${image.path}`}
      />) : ""}
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
      {showComments ? comments.map(comment => (<CommentComponent key={comment.node_id} comment={comment} />)) : ''}
      <AddCommentComponent placeholder="Write a comment..." buttonLabel="Comment" handlePostComment={handleCreateNewComment} />
    </div>
  );
}

export default PostComponent;