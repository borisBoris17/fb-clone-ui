import { React, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Button, Typography } from '@mui/material';
import ReplyComponent from './ReplyComponent';
import AuthorComponent from './AuthorComponent';
import '../Stylesheets/Comment.css'
import AddCommentComponent from './AddCommentComponent';

function CommentComponent({ comment, profileData }) {
  const [author, setAuthor] = useState({});
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    if (comment.node_id) {
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${comment.node_id}/Authored_by/Profile`).then(resp => {
        setAuthor(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${comment.node_id}/Comment/Comment`).then(resp => {
        setReplies(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/relation/${comment.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
      });
    }
  }, []);

  const handleCreateNewReply = async (replyText) => {
    const reply = createCommentObject(replyText);
    const savedReply = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/node/`, reply);
    const commentRelation = createRelationObject(comment.node_id, savedReply.data.node_id, 'Comment');
    const authoredRelation = createRelationObject(profileData.node_id, savedReply.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedReply.data.node_id, profileData.node_id, 'Authored_by');
    const savedCommentRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, commentRelation);
    const savedAuthoredRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredRelation);
    const savedAuthoredByRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, authoredByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/node/${comment.node_id}/Comment/Comment`).then(resp => {
      setReplies(resp.data);
      setShowCommentInput(false);
    });
  }

  const handleLikeComment = async () => {
    const likeRelation = createRelationObject(profileData.node_id, comment.node_id, 'Like');
    const likedByRelation = createRelationObject(comment.node_id, profileData.node_id, 'Liked_by');
    const savedLikeRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, likeRelation);
    const savedLikedByRelation = await axios.post(`${config.api.protocol}://${config.api.host}/fb-clone/relation/`, likedByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/fb-clone/relation/${comment.node_id}/Liked_by`).then(resp => {
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
    <div className="comments">
      {author.content !== undefined ?
        <div >
          <AuthorComponent author={author} timestamp={comment !== undefined ? comment.created_at : ""} />
          <div className="commentBlock">
            <Typography className='commentText'>{comment.content !== undefined ? comment.content.text : ""}</Typography>
            {likes.length > 0 ? <Typography className='commentLikes'>{likes.length} Like</Typography> : ''}
          </div>
          {showCommentInput ? <AddCommentComponent profileData={profileData} placeholder={"Reply..."} buttonLabel={"Reply"} handlePostComment={handleCreateNewReply} /> : ''}
          <div className="commentInterations">
            <Button varient="text" size="small" onClick={handleLikeComment}>Like</Button>
            <Button varient="text" size="small" onClick={() => {setShowCommentInput(!showCommentInput)}}>Reply</Button>
          </div>
          <div className='replies'>
            {replies.map(reply => <CommentComponent key={reply.node_id} profileData={profileData} comment={reply}/>)}
          </div>
        </div> : ""}
    </div>
  );
}

export default CommentComponent;