import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import RecordsList from './RecordsList';
import Timer from './Timer';
import CategoriesList from './CategoriesList';
import Stats from './Stats';
import Todo from './Todo';

type MainProps = {
  sidebarWidth?: number;
  headerHeight?: number;
}

const DEFAULT_SIDEBAR_WIDTH = 150;
const DEFAULT_HEADER_HEIGHT = 63;

const Main: React.FC<MainProps> = ({
  sidebarWidth = DEFAULT_SIDEBAR_WIDTH,
  headerHeight = DEFAULT_HEADER_HEIGHT
}) => {
  const [activeComponent, setActiveComponent] = useState<string>(() => {
    // localStorageから値を読み込む
    return localStorage.getItem('activeComponent') || 'recordsList';
  });

  // コンポーネントの選択が変わったらlocalStorageを更新
  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);
  }, [activeComponent]);

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
        {activeComponent === 'categories' && <CategoriesList />}
        {activeComponent === 'stats' && <Stats />}
        {activeComponent === 'todo' && <Todo />}
      </Box>
    </Box>
  );
}

export default Main;
