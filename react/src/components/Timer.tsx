import { useState } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Stopwatch } from './Stopwatch';
import { MarkdownEditor } from './MarkdownEditor';

import Devider from '@mui/material/Divider';

export const Timer = () => {

  const [mdValue, setMdValue] = useState("**Hello world!!!**");

  return (
    <div>
      <Header />
      <Sidebar />
      <Stopwatch mdValue={mdValue} />
      <div style={{ margin: 20 }}>
        <Devider />
      </div>
      <MarkdownEditor mdValue={mdValue} setMdValue={setMdValue} />
    </div>
  );
}