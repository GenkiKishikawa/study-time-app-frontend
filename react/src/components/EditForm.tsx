import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import {
  putRecord,
  type PutRecordParams,
} from "../api/request";
import Overlay from "./common/Overlay";
import { RecordType } from "../pages/main/Records";
import { dateFormater, minutesFormatter, hourToMinutes } from "../utils/formater";

type EditFormProps = {
  IsShowEditForm: boolean;
  setIsShowEditForm: (show: boolean) => void;
  record: RecordType;
};

const EditForm: React.FC<EditFormProps> = ({ IsShowEditForm, setIsShowEditForm, record }) => {
  const [thisRecord, setThisRecord] = useState(record);
  console.log(thisRecord.studyMinutes);

  const closeEditForm = () => {
    setIsShowEditForm(false);
  }

  const handleUpdateRecord = async () => {
    const params: PutRecordParams = {
      studyMinutes: thisRecord.studyMinutes,
      startDatetime: new Date(thisRecord.startDatetime),
      endDatetime: new Date(thisRecord.endDatetime),
    }
    try {
      await putRecord(thisRecord.id, params);
    } catch (err) {
      console.error('Failed to update record:', err);
    }
    setIsShowEditForm(false);
  }

  if (!IsShowEditForm) return null;

  return (
    <Overlay onClick={closeEditForm}>
      <div id="editForm" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Study Record</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            type="datetime-local"
            id="date"
            label="開始日"
            sx={{ margin: '5px', width: '40%' }}
            value={dateFormater(thisRecord.startDatetime)}
            onChange={(e) => setThisRecord({ ...thisRecord, startDatetime: String(e.target.value) })}
          />
          <TextField
            type="datetime-local"
            id="endDay"
            label="終了日"
            sx={{ margin: '5px', width: '40%' }}
            value={dateFormater(thisRecord.endDatetime)}
            onChange={(e) => setThisRecord({ ...thisRecord, endDatetime: String(e.target.value) })}
          />
          <TextField
            type="time"
            id="studyMinute"
            label="勉強時間"
            sx={{ margin: '5px', width: '40%' }}
            value={minutesFormatter(thisRecord.studyMinutes)}
            onChange={(e) => setThisRecord({ ...thisRecord, studyMinutes: Number(hourToMinutes(e.target.value)) })}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleUpdateRecord}
          >
            続ける
          </Button>
        </form>
      </div>
    </Overlay>
  )
}

export default EditForm;