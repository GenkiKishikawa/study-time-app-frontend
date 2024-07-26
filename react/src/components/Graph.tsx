import React, { useState } from 'react';

import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

import MonthlyGraph from './MonthlyGraph';
import DailyGraph from './DailyGraph';

const Graph: React.FC = (props) => {
  const [graph, setGraph] = useState("daily");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGraph(event.target.value as string);
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginTop: 3,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 4,
        width: 600,
        height: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 5 }}>
        <FormControl>
          <NativeSelect
            defaultValue={"daily"}
            onChange={handleChange}
            inputProps={{
              name: 'graph',
              id: 'uncontrolled-native',
            }}
          >
            <option value={"daily"}>daily</option>
            <option value={"monthly"}>monthly</option>
          </NativeSelect>
        </FormControl>
      </Box>
      {graph === "monthly" && < MonthlyGraph />}
      {graph === "daily" && <DailyGraph />}
    </Box>
  )
}

export default Graph;