import React, { useState } from "react";
import { TextField, Button, styled } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { putRecord } from "../api/request";

type EditFormProps = {
  IsShowEditForm: boolean;
  setIsShowEditForm: (show: boolean) => void;
  record: {
    id: number;
    startDay: number;
    startTime: string;
    endDay: number;
    endTime: string;
    studyTime: number;
  };
}

const SendButton = styled(Button)({
  color: '#d9d9d9',
  backgroundColor: '#434343',
  '&:hover': {
    backgroundColor: '#333333',
  }
});

const EditForm: React.FC<EditFormProps> = ({ IsShowEditForm, setIsShowEditForm, record }) => {
  const [thisRecord, setThisRecord] = useState(record);

  const closeEditForm = () => {
    setIsShowEditForm(false);
  }

  const handleUpdateRecord = async () => {
    try {
      await putRecord(thisRecord.id, thisRecord)
      console.log('Record updated successfully');
    } catch (err) {
      console.error('Failed to update record:', err);
    }
    setIsShowEditForm(false);
  }

  if (!IsShowEditForm) return null;

  return (
    <div className="overlay" onClick={closeEditForm}>
      <div id="editForm" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Study Record</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            type="text"
            id="date"
            label="開始日"
            sx={{ margin: '5px', width: '40%' }}
            value={thisRecord.startDay}
            onChange={(e) => setThisRecord({ ...thisRecord, startDay: Number(e.target.value) })}
          />
          <TextField
            type="time"
            id="time"
            label="開始時間"
            sx={{ margin: '5px', width: '40%' }}
            value={thisRecord.startTime}
            onChange={(e) => setThisRecord({ ...thisRecord, startTime: e.target.value })}
          />
          <TextField
            type="text"
            id="endDay"
            label="終了日"
            sx={{ margin: '5px', width: '40%' }}
            value={thisRecord.endDay}
            onChange={(e) => setThisRecord({ ...thisRecord, endDay: Number(e.target.value) })}
          />
          <TextField
            type="time"
            id="endTime"
            label="終了時間"
            sx={{ margin: '5px', width: '40%' }}
            value={thisRecord.endTime}
            onChange={(e) => setThisRecord({ ...thisRecord, endTime: e.target.value })}
          />
          <div style={{ width: '40%' }}>
            <TextField
              type="number"
              id="studyTime"
              label="勉強時間(秒)"
              sx={{ width: '50%' }}
              value={thisRecord.studyTime}
              onChange={(e) => setThisRecord({ ...thisRecord, studyTime: Number(e.target.value) })}
            />
            <TextField
              type="text"
              disabled
              sx={{ width: '50%' }}
              value={`${Math.floor(thisRecord.studyTime / 3600)}:${Math.floor(thisRecord.studyTime % 3600 / 60)}:${thisRecord.studyTime % 60}`}
            />
          </div>
          <SendButton
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleUpdateRecord}
          >
            続ける
          </SendButton>
        </form>
      </div>
    </div>
  )
}

export default EditForm;