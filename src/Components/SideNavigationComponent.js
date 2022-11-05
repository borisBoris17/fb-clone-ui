import {React} from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Home} from '@mui/icons-material';

function SideNavigationComponent() {
  return (
      <Box>
        <List>
          <ListItem  variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListItemButton >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
  );
}

export default SideNavigationComponent;