import React from 'react';
import { Box } from '@mui/material';

import Board from '../../components/Board';

const Todo: React.FC = () => {
  return (
    <Box>
      <Box>
        <h1>Todo</h1>
        <h2>やること</h2>
      </Box>
      <Box>
        <Board />
      </Box>
    </Box>

  );
}

export default Todo;