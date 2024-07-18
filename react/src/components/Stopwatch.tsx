import { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

import { postRecord } from "../api/request";

export const Stopwatch = (mdValue) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();

  const [startTimeValue, setStartTimeValue] = useState("");

  const handleStart = () => {
    if (!startTimeValue) {
      setStartTimeValue(new Date().toString());
    }
    start();
  }

  const handleReset = () => {
    reset();
    setStartTimeValue("");
  }

  const navigate = useNavigate();

  const handleSave = async () => {
    const params = {
      studyTime: `${hours}:${minutes}:${seconds}`,
      startYear: new Date(startTimeValue).getFullYear(),
      startMonth: new Date(startTimeValue).getMonth() + 1,
      startDay: new Date(startTimeValue).getDate(),
      startTime: new Date(startTimeValue).toLocaleTimeString(),
      endYear: new Date().getFullYear(),
      endMonth: new Date().getMonth() + 1,
      endDay: new Date().getDate(),
      endTime: new Date().toLocaleTimeString(),
      memo: mdValue['mdValue'].toString(),
    };

    await postRecord(params);

    navigate('/');
  }

  return (
    <div>
      <h1>Timer</h1>
      <a>start: {startTimeValue}</a>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}