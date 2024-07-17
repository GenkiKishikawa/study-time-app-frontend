import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Stopwatch } from './Stopwatch';
import { MarkdownEditor } from './MarkdownEditor';

import Devider from '@mui/material/Divider';

export const Timer = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Stopwatch />
      <div style={{ margin: 20 }}>
        <Devider />
      </div>
      <MarkdownEditor />
    </div>
  );
}