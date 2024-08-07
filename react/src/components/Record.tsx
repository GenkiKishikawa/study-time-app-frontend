import React, { useState, useEffect } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { deleteRecord, getCategory } from '../api/request';
import Memo from './Memo';
import EditForm from './EditForm';
import { RecordType } from '../pages/main/Records';

type RecordPropsType = {
  record: RecordType;
  records: RecordType[];
  setRecords: (records: RecordType[]) => void;
}

const Record: React.FC<RecordPropsType> = ({ record, records, setRecords }) => {
  const [isShowMemo, setIsShowMemo] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory(record.categoryId);
        setCategory(res.data.name);
      } catch (err) {
        console.error('Failed to fetch category:', err);
      }
    }
    fetchCategory();
  }, []);

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

  const dateFormater = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
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
          primary={`${(record.studyMinutes / 60).toFixed(1)} Hours　${category}　${dateFormater(record.startDatetime)}`}
          style={{ paddingRight: 0 }}
        />
      </ListItem >
      {isShowEditForm && <EditForm IsShowEditForm={isShowEditForm} setIsShowEditForm={setIsShowEditForm} record={record} />}
      {isShowMemo && <Memo setIsShowMemo={setIsShowMemo} memo={record.memo} recordId={record.id} />}
    </>
  );
};

export default Record;