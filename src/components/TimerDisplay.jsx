"use client";
import { useState, useEffect } from "react";

function FlipDigit({ digit }) {
  const [current, setCurrent] = useState(digit);
  const [next, setNext] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit === current) return;

    setNext(digit);
    setFlipping(true);

    const midFlip = setTimeout(() => setCurrent(digit), 600);
    const endFlip = setTimeout(() => setFlipping(false), 1200);

    return () => {
      clearTimeout(midFlip);
      clearTimeout(endFlip);
    };
  }, [digit, current]);

  return (
    <div className="relative w-14 h-20 perspective font-extrabold text-6xl md:text-8xl">
      <div className="absolute top-0 w-full h-1/2 overflow-hidden flex items-start justify-center bg-gray-900 text-gray-200">
        {current}
      </div>

      <div className="absolute bottom-0 w-full h-1/2 overflow-hidden flex items-end justify-center bg-gray-700 text-gray-100">
        {current}
      </div>

      {flipping && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 w-full h-1/2 overflow-hidden flex items-start justify-center bg-gray-900 text-gray-200 origin-bottom animate-flip-top">
            {current}
          </div>
          <div className="absolute bottom-0 w-full h-1/2 overflow-hidden flex items-end justify-center bg-gray-700 text-gray-100 origin-top animate-flip-bottom">
            {next}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimerDisplay({ time = 0 }) {
  const [timeLeft, setTimeLeft] = useState(Number(time) || 0);
  const [pause, setPause] = useState(false);

  function reset() {
    setTimeLeft(0);
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

    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, pause]);

  const splitDigits = num => num.toString().padStart(2, "0").split("");

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white gap-2">
          {splitDigits(hours).map((d, i) => (
            <FlipDigit key={i} digit={Number(d)} />
          ))}
        </div>

        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white gap-2">
          {splitDigits(minutes).map((d, i) => (
            <FlipDigit key={i} digit={Number(d)} />
          ))}
        </div>

        <div className="border-2 border-[#E2DCC7] shadow-md p-10 rounded-3xl flex justify-center bg-white gap-2">
          {splitDigits(seconds).map((d, i) => (
            <FlipDigit key={i} digit={Number(d)} />
          ))}
        </div>

        <p className="text-sm font-bold text-center text-[#B88A2C]">HOURS</p>
        <p className="text-sm font-bold text-center text-[#B88A2C]">MINUTES</p>
        <p className="text-sm font-bold text-center text-[#B88A2C]">SECONDS</p>

        {pause ? (
          <button onClick={resumeTimer} className="bg-[#F7D774] hover:bg-[#F5C94A] text-[#3A3A3A] font-semibold w-48 py-3 rounded-full shadow">
            Resume
          </button>
        ) : (
          <button onClick={pauseTimer} className="bg-[#F7D774] hover:bg-[#F5C94A] text-[#3A3A3A] font-semibold w-48 py-3 rounded-full shadow">
            Pause
          </button>
        )}
        <button onClick={reset} className="bg-[#F7D774] hover:bg-[#F5C94A] text-[#3A3A3A] font-semibold w-48 py-3 rounded-full shadow">
          Reset
        </button>
      </div>
    </div>
  );
}
