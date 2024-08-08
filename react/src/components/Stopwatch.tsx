import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { IconButton, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';

import {
  postRecord,
  type PostRecordParams
} from "../api/request";

type StopwatchProps = {
  mdValue: string;
  categoryId: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ mdValue, categoryId }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch();
  const navigate = useNavigate();
  const [startDatetime, setStartDatetime] = useState<Date | null>(null);

  const handleStart = () => {
    if (!startDatetime) {
      setStartDatetime(new Date());
    }
    start();
  }

  const handleReset = () => {
    reset(undefined, false);
    setStartDatetime(null);
  }

  const handleSave = async () => {
    if (startDatetime === null) return;

    const params: PostRecordParams = {
      studyMinutes: totalSeconds / 60,
      startDatetime: startDatetime,
      endDatetime: new Date(),
      mdValue: mdValue,
      categoryId: categoryId,
    };

    await postRecord(params);
    navigate("/");
  }

  return (
    <Box style={{ alignItems: "center", textAlign: "center" }}>
      <Box style={{ fontSize: '70px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </Box>
      <p>開始時間: {startDatetime?.toLocaleString()}</p>
      <IconButton onClick={handleStart} >
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={pause} >
        <StopIcon />
      </IconButton>
      <IconButton onClick={handleReset} >
        <RestartAltIcon />
      </IconButton>
      <IconButton onClick={handleSave} disabled={startDatetime ? false : true} >
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default Stopwatch;