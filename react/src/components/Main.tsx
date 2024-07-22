import { useState } from 'react';

import {
  Box,
} from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import RecordsList from './RecordsList.tsx';
import Timer from './Timer';

const sidebarWidth = 150;
const headerHeight = 63;

const Main = () => {

  const [activeComponent, setActiveComponent] = useState('recordsList');

  // コンポーネントを切り替える関数
  const handleComponentSwitch = (componentName) => {
    setActiveComponent(componentName);
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Header headerHeight={headerHeight} activeComponent={activeComponent} />
        <Sidebar onComponentSwitch={handleComponentSwitch} sidebarWidth={sidebarWidth} />
        <Box sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${sidebarWidth}px)` }, mt: `${headerHeight}px` }}>
          {activeComponent === 'recordsList' && <RecordsList />}
          {activeComponent === 'timer' && <Timer onComponentSwitch={handleComponentSwitch} />}
        </Box>
      </Box>
    </div >
  );
}

export default Main;
