import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {

  const sidebarWidth = 150;
  const headerHeight = 60;

  return (
    <Box>
      <Header headerHeight={headerHeight} />
      <Sidebar sidebarWidth={sidebarWidth} />
      <Box
        component="main"
        flexGrow={1}
        p={3}
        sx={{
          marginLeft: `${sidebarWidth}px`,
          width: `100% - ${sidebarWidth}px`
        }}
      >
        <Outlet />
      </Box>
    </Box >
  );
}

export default Layout;