import { React } from 'react';
import { Typography, ListItem, ListItemIcon, TextField } from '@mui/material';

function EditProfileDataComponent({ icon: Icon, title, fieldName, dataValue, handleEditProfileDataDetail }) {

  const handleUpdate = (event) => {
    handleEditProfileDataDetail(fieldName, event.target.value);
  }

  return (
    <ListItem className='profileDataListItem'>
        <ListItemIcon sx={{
          minWidth: '40px',
        }}>
          <Icon />
        </ListItemIcon>
        <Typography
          noWrap
          sx={{
            fontSize: "14pt",
            fontWeight: "bold",
            color: "#808080",
            textAlign: "left",
            flexBasis: "8em"
          }}>{title}
        </Typography>
        <TextField 
          className='editProfileData'
          value={dataValue} 
          onChange={handleUpdate}/>
      </ListItem>
  )
}

export default EditProfileDataComponent;