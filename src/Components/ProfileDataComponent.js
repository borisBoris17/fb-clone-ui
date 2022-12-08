import { React, useEffect, useState } from 'react';
// import config from '../config';
import { List } from '@mui/material';
import { WorkOutline, HomeOutlined, DirectionsRunOutlined } from '@mui/icons-material';
import DisplayProfileDataComponent from './DisplayProfileDataComponent';
import EditProfileDataComponent from './EditProfileDataComponent';

function ProfileDataComponent({ profileData, isEditMode, setProfileData, setProfileId }) {
  const [hobbiesString, setHobbiesString] = useState('');

  useEffect(() => {
    if (profileData.content !== undefined && profileData.content.hobbies !== undefined) {
      setHobbiesString(printHobbiesList(profileData.content.hobbies));
    }
  }, [profileData.content]);

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
    const updatedContent = {...profileData.content, [fieldName]: updatedValue};
    setProfileData({...profileData, content: updatedContent});
  }

  return (
    <div className='profileData'>
      {profileData !== undefined && profileData.content !== undefined ?
        <List>

          {isEditMode ?
            <EditProfileDataComponent
              className='editProfileData'
              title="From"
              fieldName="currentHome"
              dataValue={profileData.content.currentHome}
              icon={HomeOutlined}
              handleEditProfileDataDetail={handleEditProfileDataDetail}
            /> :
            <DisplayProfileDataComponent
              title="From"
              dataValue={profileData.content.currentHome}
              icon={HomeOutlined}
            />
          }
            {isEditMode ?
              <EditProfileDataComponent
                className='editProfileData'
                title="Profession"
                fieldName="profession"
                dataValue={profileData.content.profession}
                icon={WorkOutline}
                handleEditProfileDataDetail={handleEditProfileDataDetail}
              /> :
              <DisplayProfileDataComponent
                title="Profesion"
                dataValue={profileData.content.profession}
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