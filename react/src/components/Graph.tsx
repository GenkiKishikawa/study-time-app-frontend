import React, { useState, useEffect } from 'react';
import { Box, FormControl, NativeSelect } from '@mui/material';

import MonthlyGraph from './MonthlyGraph';
import DailyGraph from './DailyGraph';
import {
  getMonthlyTime,
  getDailyTime,
  type GetMonthlyTimeQuery,
  type GetDailyTimeQuery,
} from '../api/request';

type DailyDataType = {
  name: string;
  studyTime: string;
};

type MonthlyDataType = {
  name: string;
  studyTime: string;
};

const Graph: React.FC = () => {
  const [graph, setGraph] = useState("daily");
  const [dailyData, setDailyData] = useState<DailyDataType[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);

  useEffect(() => {
    const fetchMonthlyTime = async () => {
      const newMonthlyData: MonthlyDataType[] = [];
      try {
        for (let month = 1; month <= 12; month++) {
          const query: GetMonthlyTimeQuery = {
            year: new Date().getFullYear(),
            month: month,
          };
          const response = await getMonthlyTime(query);
          newMonthlyData.push({ name: month.toString(), studyTime: (response.data / 60).toFixed(1) });
        }
        setMonthlyData(newMonthlyData);
      } catch (err) {
        console.error('Failed to get monthly time:', err);
      }
    };
    fetchMonthlyTime();
  }, []);

  useEffect(() => {
    const newDailyData: DailyDataType[] = [];
    const fetchDailyTime = async () => {
      try {
        const getLastDayOfMonth = () => {
          new Date().getFullYear();
          new Date().getMonth() + 1;
          return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
        }
        for (let day = 1; day <= getLastDayOfMonth(); day++) {
          const query: GetDailyTimeQuery = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: day,
          };
          const response = await getDailyTime(query);
          newDailyData.push({ name: day.toString(), studyTime: (response.data / 60).toFixed(1) });
        }
        setDailyData(newDailyData);
      } catch (err) {
        console.error('Failed to get daily time:', err);
      }
    };
    fetchDailyTime();
  }, []);

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
      {graph === "monthly" && <MonthlyGraph monthlyData={monthlyData} />}
      {graph === "daily" && <DailyGraph dailyData={dailyData} />}
    </Box>
  )
}

export default Graph;