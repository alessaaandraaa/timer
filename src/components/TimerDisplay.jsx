import { useState, useEffect } from "react";

export default function TimerDisplay({ time = 0 }) {
  const [timeLeft, setTimeLeft] = useState(Number(time) || 0);
  const [pause, setPause] = useState(false);

  function reset() {
    setTime(0);
  }

  function pauseTimer() {
    setPause(true);
  }

  function resumeTimer() {
    setPause(false);
  }

  useEffect(() => {
    if (time >= 0) setTimeLeft(time);
  }, [time]);

  const total = Math.max(timeLeft, 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  useEffect(() => {
    if (!timeLeft || pause) return;
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, pause]);

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">

        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white">
          <h1 className="text-8xl md:text-9xl font-extrabold text-[#3A3A3A]">
            {hours.toString().padStart(2, "0")}
          </h1>
        </div>

        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white">
          <h1 className="text-8xl md:text-9xl font-extrabold text-[#3A3A3A]">
            {minutes.toString().padStart(2, "0")}
          </h1>
        </div>

        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white">
          <h1 className="text-8xl md:text-9xl font-extrabold text-[#3A3A3A]">
            {seconds.toString().padStart(2, "0")}
          </h1>
        </div>

        <p className="text-sm font-bold text-center text-[#B88A2C]">HOURS</p>
        <p className="text-sm font-bold text-center text-[#B88A2C]">MINUTES</p>
        <p className="text-sm font-bold text-center text-[#B88A2C]">SECONDS</p>

        {pause ? (
            <button
              onClick={resumeTimer}
              className="bg-[#F7D774] hover:bg-[#F5C94A]
                         text-[#3A3A3A] font-semibold
                         w-48 py-3 rounded-full shadow"
            >
              Resume
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="bg-[#F7D774] hover:bg-[#F5C94A]
                         text-[#3A3A3A] font-semibold
                         w-48 py-3 rounded-full shadow"
            >
              Pause
            </button>
          )}
          <button
            onClick={reset}
            className="bg-[#F7D774] hover:bg-[#F5C94A]
                       text-[#3A3A3A] font-semibold
                       w-48 py-3 rounded-full shadow"
          >
            Reset
          </button>
      </div>
    </div>
  );
}
