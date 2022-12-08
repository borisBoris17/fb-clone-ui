import {React} from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {Home, AccountBox} from '@mui/icons-material';

function SideNavigationComponent() {
  return (
      <Box>
        <List>
          <ListItem variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListItemButton href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListItemButton  href="/Profile" >
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
  );
}

export default SideNavigationComponent;