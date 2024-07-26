import React, { useState } from 'react';

import Devider from '@mui/material/Divider';
import { Box } from '@mui/material';

import Stopwatch from './Stopwatch';
import MarkdownEditor from './MarkdownEditor';

type TimerProps = {
  onComponentSwitch: (componentName: string) => void;
}

const Timer: React.FC<TimerProps> = ({ onComponentSwitch }) => {

  const [mdValue, setMdValue] = useState("**Hello world!!!**");

  return (
    <Box>
      <Box>
        <h1>Timer</h1>
        <h2>時間計測</h2>
      </Box>
      <Stopwatch mdValue={mdValue} onComponentSwitch={onComponentSwitch} />
      <Box style={{ margin: 20 }}>
        <Devider />
      </Box>
      <MarkdownEditor mdValue={mdValue} setMdValue={setMdValue} />
    </Box>
  );
}

export default Timer;