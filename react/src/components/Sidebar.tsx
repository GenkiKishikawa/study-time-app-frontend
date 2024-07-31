import React, { useState } from 'react';
import { Box, Drawer, Tabs, Tab, Toolbar } from '@mui/material';
import DvrIcon from '@mui/icons-material/Dvr';
import WatchIcon from '@mui/icons-material/Watch';
import TimelineIcon from '@mui/icons-material/Timeline';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import ChecklistIcon from '@mui/icons-material/Checklist';

interface SidebarProps {
  onComponentSwitch: (componentName: string) => void;
  sidebarWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentSwitch, sidebarWidth }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('recordsList');

  const handleComponentSwitch = (event: React.SyntheticEvent, componentName: string) => {
    setSelectedComponent(componentName);
    onComponentSwitch(componentName);
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
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedComponent}
          onChange={handleComponentSwitch}
          sx={{
            borderColor: 'divider',
            borderRadius: 1,
            '.MuiTab-root': {
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          }}
          TabIndicatorProps={{ style: { backgroundColor: '#a9a9a9' } }}
        >
          <Tab value="recordsList" label="Time Records" icon={<DvrIcon />} iconPosition="top"
            sx={{ my: 1, '&.Mui-selected': { color: '#434343' }, textTransform: "none" }} />
          <Tab value="timer" label="Timer" icon={<WatchIcon />} iconPosition="top"
            sx={{ my: 1, '&.Mui-selected': { color: '#434343' }, textTransform: "none" }} />
          <Tab value="categories" label="Category" icon={<SubjectRoundedIcon />} iconPosition="top"
            sx={{ my: 1, '&.Mui-selected': { color: '#434343' }, textTransform: "none" }} />
          <Tab value="todo" label="Todo" icon={<ChecklistIcon />} iconPosition="top"
            sx={{ my: 1, '&.Mui-selected': { color: '#434343' }, textTransform: "none" }} />
          <Tab value="stats" label="Stats" icon={<TimelineIcon />} iconPosition="top"
            sx={{ my: 1, '&.Mui-selected': { color: '#434343' }, textTransform: "none" }} />
        </Tabs>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
