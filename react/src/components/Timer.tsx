import React, { useState } from 'react';

import Stopwatch from './Stopwatch';
import MarkdownEditor from './MarkdownEditor';

import Devider from '@mui/material/Divider';

type TimerProps = {
  onComponentSwitch: (componentName: string) => void;
}

const Timer: React.FC<TimerProps> = ({ onComponentSwitch }) => {

  const [mdValue, setMdValue] = useState("**Hello world!!!**");

  return (
    <div>
      <h1>Timer</h1>
      <h2>時間計測</h2>
      <Stopwatch mdValue={mdValue} onComponentSwitch={onComponentSwitch} />
      <div style={{ margin: 20 }}>
        <Devider />
      </div>
      <MarkdownEditor mdValue={mdValue} setMdValue={setMdValue} />
    </div>
  );
}

export default Timer;