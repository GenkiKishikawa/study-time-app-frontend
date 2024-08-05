import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Stopwatch from '../../components/Stopwatch';
import MarkdownEditor from '../../components/MarkdownEditor';
import { getCategories } from '../../api/request';

type Category = {
  id: number;
  name: string;
}

const Timer: React.FC = () => {
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
      <Stopwatch mdValue={mdValue} categoryId={category} />
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
      <MarkdownEditor mdValue={mdValue} setMdValue={setMdValue} />
    </Box>
  );
}

export default Timer;