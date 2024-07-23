import { useState } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { deleteRecord } from '../api/request';
import Memo from './Memo';
import EditForm from './EditForm';

const Record = ({ record, records, setRecords }) => {
  const [isShowMemo, setIsShowMemo] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const handleDeleteRecord = async () => {
    try {
      await deleteRecord(record.id);
      const updatedRecords = records.filter(r => r.id !== record.id);
      setRecords(updatedRecords);
    } catch (err) {
      console.error('Failed to delete record:', err);
    }
  };

  const toggleMemoVisibility = () => {
    setIsShowMemo(true);
  };

  const toggleEditFormVisibility = () => {
    setIsShowEditForm(true);
  }

  const displayTimeFormat = (record) => {
    if (record.startDay === record.endDay) {
      return `${record.startYear}年${record.startMonth}月${record.startDay}日 ${record.startTime} ~ ${record.endTime}`;
    } else if (record.startMonth === record.endMonth) {
      return `${record.startYear}年${record.startMonth}月${record.startDay}日 ${record.startTime} ~ ${record.endDay}日 ${record.endTime}`;
    } else if (record.startYear === record.endYear) {
      return `${record.startYear}年${record.startMonth}月${record.startDay}日 ${record.startTime} ~ ${record.endMonth}月${record.endDay}日 ${record.endTime}`;
    }
  }

  return (
    <>
      <ListItem
        secondaryAction={
          <div>
            <IconButton onClick={toggleMemoVisibility}>
              <MenuBookIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={toggleEditFormVisibility}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteRecord}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
      >
        <AccessTimeIcon style={{ marginRight: '10px' }} />
        <ListItemText
          primary={`${(record.studyTime / 3600).toFixed(1)} Hour　　　${displayTimeFormat(record)}`}
          style={{ paddingRight: 0 }}
        />
      </ListItem >
      {isShowEditForm && <EditForm IsShowEditForm={isShowEditForm} setIsShowEditForm={setIsShowEditForm} record={record} />}
      {isShowMemo && <Memo IsShowMemo={isShowMemo} setIsShowMemo={setIsShowMemo} memo={record.memo} recordId={record.id} />}
    </>
  );
};

export default Record;