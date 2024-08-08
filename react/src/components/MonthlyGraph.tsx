import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

interface MonthlyData {
  name: string;
  studyTime: string;
}

const MonthlyGraph: React.FC<{ monthlyData: MonthlyData[] }> = ({ monthlyData }) => {
  const maxStudyTime: number = Math.floor(Math.max(...monthlyData.map(data => Number(data.studyTime))) * 1.2);

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
          <YAxis domain={[0, maxStudyTime]} />
          <Tooltip />
          <Bar dataKey="studyTime" fill="#434343" activeBar={<Rectangle fill="#f5f5f5" stroke="#434343" />} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default MonthlyGraph;