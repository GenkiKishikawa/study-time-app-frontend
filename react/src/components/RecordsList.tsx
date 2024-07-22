import React, { useState, useEffect } from 'react';
import {
  List,
  Pagination,
} from '@mui/material';

import { getRecords } from '../api/request';

import Record from './Record';

const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // トータルページ数を状態で管理

  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    getRecords(page).then(res => {
      setRecords(res.data.records);
      setPage(res.data.pagination.pagination.current);
      setTotalPages(res.data.pagination.pagination.pages); // ページ総数を設定
    }).catch(err => console.error('Failed to fetch records:', err));
  }, [page]);

  return (
    <div>
      <div>
        <h1>Time Records</h1>
        <h2>学習記録</h2>
      </div>
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
            <React.Fragment key={record.id}>
              <Record records={records} record={record} setRecords={setRecords} />
            </React.Fragment>
          ))
        }
      </List >
      < Pagination count={totalPages} color="primary" page={page} onChange={handleChange} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
    </div>
  );
};

export default RecordsList;
