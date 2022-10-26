import React from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 2px solid #2e2e2e;
  margin: 10px;
`;

const TimerTitle = styled.div`
  font-size: 15px;
  font-style: italic;
  text-align: center;
  background-color: #2e2e2e;
  padding: 5px 0;
  color: #ffffff;
`;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
  ];

  return (
    <Timers>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.title}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          <div style={{ padding: "20px",}}>{timer.C}</div>
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
