import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Pagination,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getRecords, deleteRecord } from '../api/request';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const drawerWidth = 120;

export const Main = () => {
  const [records, setRecords] = useState([]); // recordsの状態を初期化

  useEffect(() => {
    getRecords().then(res => {
      setRecords(res.data); // APIから取得したデータでrecordsを更新
      console.log(res.data);
    }).catch(err => console.error('Failed to fetch records:', err));
  }, []);

  const handleDeleteRecord = (id: number) => {
    deleteRecord(id).then(res => {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
    }).catch(err => console.error('Failed to delete record:', err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <List>
          {records.map((record) => (
            <ListItem key={record.id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRecord(record.id)} >
                  <DeleteIcon />
                </IconButton>
              </>
            }>
              <AccessTimeIcon style={{ marginRight: '10px' }} />
              <ListItemText primary={`${record.studyTime} ${record.startYear}-${record.startMonth}-${record.startDay} ${record.startTime} ~ ${record.endYear}-${record.endMonth}-${record.endDay} ${record.endTime}`} />
            </ListItem>
          ))}
        </List>
        <Pagination count={10} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
      </Box>
    </Box>
  );
}
