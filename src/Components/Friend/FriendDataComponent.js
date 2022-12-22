import { React, useEffect, useState } from 'react';
import { List } from '@mui/material';
import { WorkOutline, HomeOutlined, DirectionsRunOutlined } from '@mui/icons-material';
import DisplayProfileDataComponent from '../Profile/DisplayProfileDataComponent';

function FriendDataComponent({ profile }) {
  const [hobbiesString, setHobbiesString] = useState('');

  useEffect(() => {
    if (profile.content !== undefined && profile.content.hobbies !== undefined) {
      setHobbiesString(printHobbiesList(profile.content.hobbies));
    }
  }, [profile.content]);

  const printHobbiesList = (hobbies) => {
    if (hobbies) {
      let hobbiesString = '';
      hobbies.forEach((element, index) => {
        if (index === 0) {
          hobbiesString = element;
        } else {
          hobbiesString = hobbiesString + ', ' + element;
        }
      });
      return hobbiesString;
    }
  }

  return (
    <div className='profileData'>
      {profile !== undefined && profile.content !== undefined ?
        <List>
          <DisplayProfileDataComponent
            title="From"
            dataValue={profile.content.currentHome}
            icon={HomeOutlined}
          />
          <DisplayProfileDataComponent
            title="Profesion"
            dataValue={profile.content.profession}
            icon={WorkOutline}
          />
          <DisplayProfileDataComponent
            title="Hobbies"
            dataValue={hobbiesString}
            icon={DirectionsRunOutlined}
          />
        </List> : ""}
    </div>
  )
}

export default FriendDataComponent;