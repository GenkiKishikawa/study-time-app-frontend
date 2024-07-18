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
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { getRecords, deleteRecord } from '../api/request';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Memo } from './Memo';

const drawerWidth = 120;

export const Main = () => {
  const [records, setRecords] = useState([]);
  const [isShowMemo, setIsShowMemo] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // トータルページ数を状態で管理

  useEffect(() => {
    getRecords(page).then(res => {
      console.log(res.data.pagination.pagination.current)
      setRecords(res.data.records);
      setPage(res.data.pagination.pagination.current);
      setTotalPages(res.data.pagination.pagination.pages); // ページ総数を設定
    }).catch(err => console.error('Failed to fetch records:', err));
  }, [page]); // 依存配列にpageを追加

  const handleDeleteRecord = (id) => {
    deleteRecord(id).then(res => {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
    }).catch(err => console.error('Failed to delete record:', err));
  };

  const showMemo = () => {
    setIsShowMemo(true);
  }

  const handleChange = (event, value) => {
    setPage(value);
  }

  return (
    <div>
      <h1>Time Records</h1>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <List>
            {records.map((record) => (
              <>
                <ListItem key={record.id} secondaryAction={
                  <>
                    <IconButton onClick={showMemo}>
                      <MenuBookIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteRecord(record.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                  <AccessTimeIcon style={{ marginRight: '10px' }} />
                  <ListItemText primary={`${record.studyTime} ${record.startYear}-${record.startMonth}-${record.startDay} ${record.startTime} ~ ${record.endYear}-${record.endMonth}-${record.endDay} ${record.endTime}`} />
                </ListItem>
                {isShowMemo && <Memo key={record.id} setIsShowMemo={setIsShowMemo} memo={record.memo} />}
              </>
            ))}
          </List>
          <Pagination count={totalPages} color="primary" page={page} onChange={handleChange} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </Box>
      </Box>
    </div>

  );
}
