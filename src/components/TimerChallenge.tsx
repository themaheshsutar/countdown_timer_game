import { useEffect, useRef, useState } from "react";
import ResultModal from "./ResultModal.tsx";
import type { ResultModalRef } from "../types/timer.ts";

interface Props {
  title: string;
  targetTime: number;
}

function TimerChallenge({ title, targetTime }: Props) {
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const dialog = useRef<ResultModalRef>(null);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  useEffect(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer.current);
      dialog.current?.open();
    }
  }, [timeRemaining]);

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    dialog.current?.open();
    if (timer.current) clearInterval(timer.current);
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

export default TimerChallenge;
