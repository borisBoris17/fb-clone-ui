import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { Button, Typography } from '@mui/material';
import AuthorComponent from './AuthorComponent';
import AddCommentComponent from './AddCommentComponent';
import { AppContext } from '../../App';

function CommentComponent({ comment }) {
  const [author, setAuthor] = useState({});
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { profile } = useContext(AppContext);

  useEffect(() => {
    if (comment.node_id) {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${comment.node_id}/Authored_by/Profile`).then(resp => {
        setAuthor(resp.data[0]);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${comment.node_id}/Comment/Comment`).then(resp => {
        setReplies(resp.data);
      });
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${comment.node_id}/Liked_by`).then(resp => {
        setLikes(resp.data);
      });
    }
  }, [comment.node_id]);

  const handleCreateNewReply = async (replyText) => {
    const reply = createCommentObject(replyText);
    const savedReply = await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/node/`, reply);
    const commentRelation = createRelationObject(comment.node_id, savedReply.data.node_id, 'Comment');
    const authoredRelation = createRelationObject(profile.node_id, savedReply.data.node_id, 'Authored');
    const authoredByRelation = createRelationObject(savedReply.data.node_id, profile.node_id, 'Authored_by');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, commentRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, authoredByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/${comment.node_id}/Comment/Comment`).then(resp => {
      setReplies(resp.data);
      setShowCommentInput(false);
    });
  }

  const handleLikeComment = async () => {
    const likeRelation = createRelationObject(profile.node_id, comment.node_id, 'Like');
    const likedByRelation = createRelationObject(comment.node_id, profile.node_id, 'Liked_by');
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, likeRelation);
    await axios.post(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/`, likedByRelation);
    axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/relation/${comment.node_id}/Liked_by`).then(resp => {
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
          {showCommentInput ? <AddCommentComponent placeholder={"Reply..."} buttonLabel={"Reply"} handlePostComment={handleCreateNewReply} /> : ''}
          <div className="commentInterations">
            <Button varient="text" size="small" onClick={handleLikeComment}>Like</Button>
            <Button varient="text" size="small" onClick={() => {setShowCommentInput(!showCommentInput)}}>Reply</Button>
          </div>
          <div className='replies'>
            {replies.map(reply => <CommentComponent key={reply.node_id} comment={reply}/>)}
          </div>
        </div> : ""}
    </div>
  );
}

export default CommentComponent;