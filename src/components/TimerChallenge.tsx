import { useRef, useState } from "react";
import ResultModal from "./ResultModal.tsx";
import type { ResultModalRef } from "../types/timer.ts";

interface Props {
  title: string;
  targetTime: number;
}

function TimerChallenge({ title, targetTime }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialog = useRef<ResultModalRef | null>(null);

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      dialog.current?.open();
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  };

  const handleStop = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

export default TimerChallenge;
