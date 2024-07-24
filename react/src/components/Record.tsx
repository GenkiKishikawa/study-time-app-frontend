import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { deleteRecord } from '../api/request';
import Memo from './Memo';
import EditForm from './EditForm';
import { RecordType } from './RecordsList';

type RecordPropsType = {
  record: RecordType;
  records: RecordType[];
  setRecords: (records: RecordType[]) => void;
}

const Record: React.FC<RecordPropsType> = (props) => {
  const [isShowMemo, setIsShowMemo] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const handleDeleteRecord = async () => {
    try {
      await deleteRecord(props.record.id);
      const updatedRecords = props.records.filter(r => r.id !== props.record.id);
      props.setRecords(updatedRecords);
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

  const displayTimeFormat = (record: RecordType) => {
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
          primary={`${(props.record.studyTime / 3600).toFixed(1)} Hour　　　${displayTimeFormat(props.record)}`}
          style={{ paddingRight: 0 }}
        />
      </ListItem >
      {isShowEditForm && <EditForm IsShowEditForm={isShowEditForm} setIsShowEditForm={setIsShowEditForm} record={props.record} />}
      {isShowMemo && <Memo setIsShowMemo={setIsShowMemo} memo={props.record.memo} recordId={props.record.id} />}
    </>
  );
};

export default Record;