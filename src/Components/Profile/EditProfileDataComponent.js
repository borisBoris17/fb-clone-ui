import { React } from 'react';
import { Typography, ListItem, ListItemIcon, TextField } from '@mui/material';
import EditListComponent from './EditListComponent';

function EditProfileDataComponent({ icon: Icon, title, fieldName, dataValue, handleEditProfileDataDetail }) {

  const handleUpdate = (event) => {
    handleEditProfileDataDetail(fieldName, event.target.value);
  }

  const handleUpdateHobbies = (newHobbies) => {
    // const newHobies = [...dataValue, event.target.value];
    handleEditProfileDataDetail(fieldName, newHobbies);
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
      {title === 'Hobbies' ? <EditListComponent hobbies={dataValue} handleUpdateHobbies={handleUpdateHobbies} /> : <TextField
        className='editProfileData'
        value={dataValue}
        onChange={handleUpdate} />}
    </ListItem>
  )
}

export default EditProfileDataComponent;