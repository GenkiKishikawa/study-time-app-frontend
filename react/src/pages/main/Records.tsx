import React, { useState, useEffect, ChangeEvent } from 'react';
import { List, Pagination, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { getRecords } from '../../api/request';
import Record from '../../components/Record';

export type RecordType = {
  id: number;
  userId: number;
  studyMinutes: number;
  startDatetime: string;
  endDatetime: string;
  memo: string;
  categoryId: number;
}

export type RecordsType = RecordType[];

const Records: React.FC = () => {
  const [records, setRecords] = useState<RecordsType>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isDesc, setIsDesc] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getRecords(page, isDesc ? 'desc' : 'asc');
        setRecords(res.data.records);
        setPage(res.data.pagination.pagination.current);
        setTotalPages(res.data.pagination.pagination.pages);
      } catch (err) {
        console.error('Failed to fetch records:', err)
      };
    }

    fetchRecords();
  }, [page, isDesc]);

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Box>
        <h1>Time Records</h1>
        <h2>学習記録</h2>
      </Box>
      <Box sx={{
        borderRadius: 8,
        marginLeft: 65,
        marginRight: 65,
        marginTop: 3,
      }}>
        <IconButton onClick={() => { setIsDesc(!isDesc) }}>
          <SwapVertIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          marginLeft: 65,
          marginRight: 65,
          marginTop: 3,
          paddingLeft: 4,
          paddingRight: 4,
        }}>
        {
          records.map((record) => (
            <Record key={record.id} records={records} record={record} setRecords={setRecords} />
          ))
        }
      </List >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default Records;
