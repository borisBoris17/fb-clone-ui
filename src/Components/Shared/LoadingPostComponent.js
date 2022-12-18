import { React } from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingPostComponent() {
  return (
    <div className="loadingContainer">
      <Box sx={{margin: '20px'}}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default LoadingPostComponent;