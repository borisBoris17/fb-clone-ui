import { React, useEffect, useState, useContext } from 'react';
// import config from '../config';
import { List } from '@mui/material';
import { WorkOutline, HomeOutlined, DirectionsRunOutlined } from '@mui/icons-material';
import DisplayProfileDataComponent from './DisplayProfileDataComponent';
import EditProfileDataComponent from './EditProfileDataComponent';
import { AppContext } from '../../App';

function ProfileDataComponent({ isEditMode }) {
  const [hobbiesString, setHobbiesString] = useState('');
  const { profile, setProfile } = useContext(AppContext);

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

  const handleEditProfileDataDetail = (fieldName, updatedValue) => {
    const updatedContent = {...profile.content, [fieldName]: updatedValue};
    setProfile({...profile, content: updatedContent});
  }

  return (
    <div className='profileData'>
      {profile !== undefined && profile.content !== undefined ?
        <List>

          {isEditMode ?
            <EditProfileDataComponent
              className='editProfileData'
              title="From"
              fieldName="currentHome"
              dataValue={profile.content.currentHome}
              icon={HomeOutlined}
              handleEditProfileDataDetail={handleEditProfileDataDetail}
            /> :
            <DisplayProfileDataComponent
              title="From"
              dataValue={profile.content.currentHome}
              icon={HomeOutlined}
            />
          }
            {isEditMode ?
              <EditProfileDataComponent
                className='editProfileData'
                title="Profession"
                fieldName="profession"
                dataValue={profile.content.profession}
                icon={WorkOutline}
                handleEditProfileDataDetail={handleEditProfileDataDetail}
              /> :
              <DisplayProfileDataComponent
                title="Profesion"
                dataValue={profile.content.profession}
                icon={WorkOutline}
              />}
            {isEditMode ?
              <EditProfileDataComponent
                className='editProfileData'
                title="Hobbies"
                fieldName="hobbies"
                dataValue={hobbiesString}
                icon={DirectionsRunOutlined}
                handleEditProfileDataDetail={handleEditProfileDataDetail}
              /> :
              <DisplayProfileDataComponent
                title="Hobbies"
                dataValue={hobbiesString}
                icon={DirectionsRunOutlined}
              />}
        </List> : ""}
    </div>
  )
}

export default ProfileDataComponent;