import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { Box, CircularProgress, Button } from '@mui/material';
import CommentComponent from './CommentComponent';
import AuthorComponent from './AuthorComponent';
import LikeBugComponent from './LikeBugComponent';
import CommentBugComponent from './CommentBugComponent';
import AddCommentComponent from './AddCommentComponent';
import { AppContext } from '../../App';
const util = require('../../Utilities/util');

function LoadingPostComponent() {
  const { profile } = useContext(AppContext);

  return (
    <div className="loadingContainer">
      <Box sx={{margin: '20px'}}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default LoadingPostComponent;