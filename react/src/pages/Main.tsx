import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Layout from '../components/Layout/Layout';
import Records from './main/Records';
import Timer from './main/Timer';
import Categories from './main/Categories';
import Stats from './main/Stats';
import Todo from './main/Todo';

import { Route, Routes } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Records />} />
          <Route path='timer' element={<Timer />} />
          <Route path='categories' element={<Categories />} />
          <Route path='stats' element={<Stats />} />
          <Route path='todo' element={<Todo />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default Main;
