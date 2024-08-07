import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';

import { postRecord } from "../api/request";
import { useNavigate } from "react-router-dom";

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

  const [startDatetime, setStartDatetime] = useState("");

  const handleStart = () => {
    if (!startDatetime) {
      setStartDatetime(new Date().toLocaleString());
    }
    start();
  }

  const handleReset = () => {
    reset();
    setStartDatetime("");
  }

  const handleSave = async () => {
    console.log("totalSeconds", totalSeconds);
    const params = {
      studyMinutes: totalSeconds / 60,
      startDatetime: startDatetime,
      endDatetime: new Date().toLocaleString(),
      memo: mdValue,
      categoryId: categoryId,
    };

    await postRecord(params);
    navigate("/");
  }

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <div style={{ fontSize: '70px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>開始時間: {startDatetime}</p>
      <IconButton onClick={handleStart} >
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={pause} >
        <StopIcon />
      </IconButton>
      <IconButton onClick={handleReset} >
        <RestartAltIcon />
      </IconButton>
      <IconButton onClick={handleSave} >
        <SendIcon />
      </IconButton>
    </div>
  )
}

export default Stopwatch;