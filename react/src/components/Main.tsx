import React, { useState, ReactElement } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import RecordsList from './RecordsList';
import Timer from './Timer';

type MainProps = {
  sidebarWidth?: number;
  headerHeight?: number;
}

const DEFAULT_SIDEBAR_WIDTH = 150;
const DEFAULT_HEADER_HEIGHT = 63;

const Main: React.FC<MainProps> = ({
  sidebarWidth = DEFAULT_SIDEBAR_WIDTH,
  headerHeight = DEFAULT_HEADER_HEIGHT
}): ReactElement => {
  const [activeComponent, setActiveComponent] = useState<string>('recordsList');

  const handleComponentSwitch = (componentName: string): void => {
    setActiveComponent(componentName);
  }

  return (
    <Box display="flex">
      <Header headerHeight={headerHeight} activeComponent={activeComponent} />
      <Sidebar onComponentSwitch={handleComponentSwitch} sidebarWidth={sidebarWidth} />
      <Box flexGrow={1} p={3} width={`calc(100% - ${sidebarWidth}px)`} mt={`${headerHeight}px`}>
        {activeComponent === 'recordsList' && <RecordsList />}
        {activeComponent === 'timer' && <Timer onComponentSwitch={handleComponentSwitch} />}
      </Box>
    </Box>
  );
}

export default Main;
