import { React, useEffect, useState } from 'react';
import { Box, TextField, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Search, AccountBox } from '@mui/icons-material';
import axios from 'axios';
import config from '../../config';


const SearchProfilesComponent = () => {
  const [keyword, setKeyword] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (keyword !== undefined && keyword !== '') {
      axios.get(`${config.api.protocol}://${config.api.host}/memory-social-api/node/search/${keyword}`).then(resp => {
        console.log(resp.data)
        setProfiles(resp.data);
      });
    }
  }, [keyword]);

  const handleUpdateKeyword = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <div className='searchProfile'>
      <TextField
        className='searchBar'
        value={keyword}
        onChange={handleUpdateKeyword}
        placeholder="Search For Friends..."
        InputProps={{
          className: 'searchBar',
          startAdornment: (
            <Search sx={{ marginRight: '10px' }} />
          ),
        }} />
      {profiles.length > 0 ? <List>
        {profiles.map(foundProfile =>
          <ListItem variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListItemButton href={`/Friend/${foundProfile.node_id}`}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary={foundProfile.content.name} />
            </ListItemButton>
          </ListItem>
        )}
      </List> : keyword !== '' ? <ListItem variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <ListItemText primary={`No profiles found matching ${keyword}`} />
      </ListItem> : ""}
    </div>
  )
}

export default SearchProfilesComponent;