import { React } from 'react';
// import config from '../config';
import { Typography, ListItem, ListItemIcon } from '@mui/material';

function DisplayProfileDataComponent({ icon: Icon, title, dataValue }) {

  return (
    <ListItem className='profileDataListItem'>
      <ListItemIcon sx={{
        minWidth: '40px',
        alignSelf: "flex-start"
      }}>
        <Icon />
      </ListItemIcon>
      <Typography
        sx={{
          fontSize: "14pt",
          fontWeight: "bold",
          color: "#808080",
          textAlign: "left",
          alignSelf: "flex-start",
          flexBasis: "5em",
          flexShrink: "0"
        }}>{title}
      </Typography>
      <Typography
        sx={{
          fontSize: "14pt",
          textAlign: "left",
          color: "#cccccc",
          marginLeft: "10px",
          alignSelf: "flex-start"
        }}>{dataValue}
      </Typography>
    </ListItem>)
}

export default DisplayProfileDataComponent;