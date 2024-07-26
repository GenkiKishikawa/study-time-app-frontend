import React from 'react';

import { Box } from '@mui/material';

import Graph from './Graph';

const Stats: React.FC = (props) => {

  return (
    <Box>
      <Box>
        <h1>Stats</h1>
        <h2>統計</h2>
      </Box>
      <Graph />
    </Box>
  );
}

export default Stats;