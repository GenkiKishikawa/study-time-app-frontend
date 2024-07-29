import React, { useState, useEffect } from 'react';

import Devider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Stopwatch from './Stopwatch';
import MarkdownEditor from './MarkdownEditor';
import { getCategories } from '../api/request';

type TimerProps = {
  onComponentSwitch: (componentName: string) => void;
}

type Category = {
  id: number;
  name: string;
}

const Timer: React.FC<TimerProps> = ({ onComponentSwitch }) => {
  const [mdValue, setMdValue] = useState("**Hello world!!!**");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.categories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Box>
      <Box>
        <h1>Timer</h1>
        <h2>時間計測</h2>
      </Box>
      <Stopwatch mdValue={mdValue} onComponentSwitch={onComponentSwitch} categoryId={category} />
      <Box style={{ margin: 20 }}>
        <Devider />
      </Box>
      <Box style={{ marginLeft: 20 }}>
        <FormControl sx={{ width: 100 }} >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box style={{ margin: 20 }}>
        <Devider />
      </Box>
      <MarkdownEditor mdValue={mdValue} setMdValue={setMdValue} />
    </Box>
  );
}

export default Timer;