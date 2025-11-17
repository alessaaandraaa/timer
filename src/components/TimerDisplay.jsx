import { useState, useEffect } from "react";

export default function TimerDisplay({ time = 0 }) {
  const [timeLeft, setTimeLeft] = useState(Number(time) || 0);
  const [pause, setPause] = useState(false);

  function pauseTimer() {
    setPause(true);
  }

  function resumeTimer() {
    setPause(false);
  }

  useEffect(() => {
    if (time >= 0) {
      setTimeLeft(time);
    }
  }, [time]);

  const total = Math.max(timeLeft, 0);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  hours = Math.floor(total / 3600);
  minutes = Math.floor((total % 3600) / 60);
  seconds = total % 60;

  useEffect(() => {
    if (!timeLeft || pause) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    console.log(timeLeft);

    return () => clearInterval(intervalId);
  }, [timeLeft, pause]);

  return (
    <div>
      <div className="grid grid-cols-3 m-10 gap-3">
        <div className="border-2 border-black shadow-md p-3 rounded-2xl">
          <h1 className="text-9xl">
            {hours < 10 ? "0" : ""}
            {hours}
          </h1>
        </div>
        <div className="border-2 border-black shadow-md p-3 rounded-2xl">
          <h1 className="text-9xl">
            {minutes < 10 ? "0" : ""}
            {minutes}
          </h1>
        </div>
        <div className="border-2 border-black shadow-md p-3 rounded-2xl">
          <h1 className="text-9xl">
            {seconds < 10 ? "0" : ""}
            {seconds}
          </h1>
        </div>
        <div>
          <p className="text-xs font-bold">HOURS</p>
        </div>
        <div>
          <p className="text-xs font-bold">MINUTES</p>
        </div>
        <div>
          <p className="text-xs font-bold">SECONDS</p>
        </div>
      </div>
      <div className="flex items-start">
        {pause ? (
          <button
            className="rounded-md border p-1 pl-1.5 pr-1.5 mt-2 hover:bg-red-500"
            onClick={resumeTimer}
          >
            Resume
          </button>
        ) : (
          <button
            className="rounded-md border p-1 pl-1.5 pr-1.5 mt-2 hover:bg-red-500"
            onClick={pauseTimer}
          >
            Pause
          </button>
        )}
      </div>
    </div>
  );
}
