import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

import { getDailyTime } from '../api/request';

type DailyDataType = {
  name: string;
  studyTime: string; // studyTimeを文字列型として扱う（toFixed(1)が返すのは文字列）
};

const DailyGraph: React.FC = () => {
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);

  useEffect(() => {
    const newDailyData: DailyDataType[] = [];
    const fetchDailyTime = async () => {
      try {
        for (let day = 1; day <= 31; day++) {
          const response = await getDailyTime(new Date().getMonth() + 1, day);
          newDailyData.push({ name: day.toString(), studyTime: (response.data / 3600).toFixed(1) });
        }
        setDailyData(newDailyData);
      } catch (err) {
        console.error('Failed to get daily time:', err);
      }
    };
    fetchDailyTime();
  }, []);

  return (
    <Box sx={{
      width: 600,
      height: 350,
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dailyData}
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

export default DailyGraph;