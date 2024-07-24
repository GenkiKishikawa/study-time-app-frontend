import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DvrIcon from '@mui/icons-material/Dvr';
import WatchIcon from '@mui/icons-material/Watch';
import TimelineIcon from '@mui/icons-material/Timeline';

interface SidebarProps {
  onComponentSwitch: (componentName: string) => void;
  sidebarWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentSwitch, sidebarWidth }) => {
  const listItemStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    my: 2  // Margin top and bottom using theme spacing
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: 'border-box',
          borderRight: 1,
          backgroundColor: '#f5f5f5',
          borderColor: '#a9a9a9',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button onClick={() => onComponentSwitch('recordsList')} sx={listItemStyle}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <DvrIcon />
            </ListItemIcon>
            <ListItemText primary="Time Records" />
          </ListItem>
          <ListItem button onClick={() => onComponentSwitch('timer')} sx={listItemStyle}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <WatchIcon />
            </ListItemIcon>
            <ListItemText primary="Timer" />
          </ListItem>
          <ListItem button sx={listItemStyle}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Stats" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
