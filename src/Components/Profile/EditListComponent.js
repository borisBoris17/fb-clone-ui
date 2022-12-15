import { React } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function EditListComponent({ hobbies, handleUpdateHobbies }) {

  const handleHobbyUpdate = (event, index) => {
    hobbies[index] = event.target.value;
    handleUpdateHobbies(hobbies);
  }

  const handleRemoveHobby = (index) => {
    hobbies.splice(index, 1);
    handleUpdateHobbies(hobbies);
  }

  return (
    <div className='editHobbyData'>
      {hobbies.map((hobby, index) => <>
        <TextField
          key={index}
          InputProps={{
            className: "hobbyTextFieldInput"
          }} 
          className="hobbyTextField"
          onChange={(e) => handleHobbyUpdate(e, index)}
          value={hobby}
        ></TextField><IconButton onClick={(e) => handleRemoveHobby(index)}><DeleteForeverIcon /></IconButton>
        <div className='break'></div></>)}
      <Button onClick={(event) => handleUpdateHobbies([...hobbies, ""])}>Add Hobby</Button>
    </div>
  );
}

export default EditListComponent;