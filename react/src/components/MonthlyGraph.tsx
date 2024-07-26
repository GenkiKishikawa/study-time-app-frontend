import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

import { getMonthlyTime } from '../api/request';

type MonthlyDataType = {
  name: string;
  studyTime: string;
};

const MonthlyGraph: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);

  useEffect(() => {
    const fetchMonthlyTime = async () => {
      const newMonthlyData: MonthlyDataType[] = [];

      try {
        for (let month = 1; month <= 12; month++) {
          const response = await getMonthlyTime(month);
          newMonthlyData.push({ name: month.toString(), studyTime: (response.data / 3600).toFixed(1) });
        }
        setMonthlyData(newMonthlyData);

      } catch (err) {
        console.error('Failed to get monthly time:', err);
      }

    };
    fetchMonthlyTime();
  }, []);

  return (
    <Box sx={{
      width: 600,
      height: 350,
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{
            top: 20,
            right: 38,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="studyTime" fill="#434343" activeBar={<Rectangle fill="#f5f5f5" stroke="#434343" />} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default MonthlyGraph;