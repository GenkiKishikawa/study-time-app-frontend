import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";

import { postRecord } from "../api/request";

type StopwatchProps = {
  mdValue: string;
  onComponentSwitch: (componentName: string) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ mdValue, onComponentSwitch }) => {
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

  const [startTimeValue, setStartTimeValue] = useState("");

  const handleStart = () => {
    if (!startTimeValue) {
      setStartTimeValue(new Date().toLocaleString());
    }
    start();
  }

  const handleReset = () => {
    reset();
    setStartTimeValue("");
  }

  const handleSave = async () => {
    const params = {
      studyTime: totalSeconds,
      startYear: new Date(startTimeValue).getFullYear(),
      startMonth: new Date(startTimeValue).getMonth() + 1,
      startDay: new Date(startTimeValue).getDate(),
      startTime: new Date(startTimeValue).toLocaleTimeString(),
      endYear: new Date().getFullYear(),
      endMonth: new Date().getMonth() + 1,
      endDay: new Date().getDate(),
      endTime: new Date().toLocaleTimeString(),
      memo: mdValue,
    };

    await postRecord(params);

    onComponentSwitch('recordsList');
  }

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <div style={{ fontSize: '70px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>開始時間: {startTimeValue}</p>
      <button className="hoverEffect" onClick={handleStart}>Start</button>
      <button className="hoverEffect" onClick={pause}>Stop</button>
      <button className="hoverEffect" onClick={handleReset}>Reset</button>
      <button className="hoverEffect" onClick={handleSave}>End</button>
    </div>
  )
}

export default Stopwatch;