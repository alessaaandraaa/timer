"use client";
import { useState, useEffect } from "react";
import FlipTimer from "./FlipTimer.jsx";
import Confetti from "react-confetti";

export default function TimerInput() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [pause, setPause] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hours = parseInt(e.target.hours.value) || 0;
    const minutes = parseInt(e.target.minutes.value) || 0;
    const seconds = parseInt(e.target.seconds.value) || 0;

    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setPause(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (pause || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev - 1 === 0) {
          setShowConfetti(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pause, timeLeft]);

  const reset = () => {
    setTimeLeft(0);
    setShowConfetti(false);
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const splitDigits = (n) => String(n).padStart(2, "0").split("");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white gap-20">
      {showConfetti ? (
        <>
          <Confetti />{" "}
          <h1 className="text-5xl font-extrabold text-[#e147ab]">
            YOU DID IT!
          </h1>
        </>
      ) : (
        <h1 className="text-5xl font-extrabold">TIMER</h1>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-1">
        <input
          type="number"
          name="hours"
          min="0"
          defaultValue="0"
          className="h-12 w-20 px-3 bg-white border-2 border-gray-400 rounded-md text-center text-base focus:outline-none"
        />

        <p className="text-3xl text-gray-500 select-none">:</p>

        <input
          type="number"
          name="minutes"
          min="0"
          defaultValue="0"
          className="h-12 w-20 px-3 bg-white border-2 border-gray-400 rounded-md text-center text-base focus:outline-none"
        />

        <p className="text-3xl text-gray-500 select-none">:</p>

        <input
          type="number"
          name="seconds"
          min="0"
          defaultValue="0"
          className="h-12 w-20 px-3 bg-white border-2 border-gray-400 rounded-md text-center text-base focus:outline-none"
        />

        <button
          type="submit"
          className="h-12 px-6 bg-yellow-400 rounded-full shadow-sm text-sm font-semibold hover:shadow-md transition"
        >
          Start
        </button>

        <div className="w-6"></div>

        {pause ? (
          <button
            type="button"
            onClick={() => setPause(false)}
            className="h-12 px-5 bg-red-400 rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition"
          >
            <img src="/play.svg" className="w-5 h-5" alt="Resume" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPause(true)}
            className="h-12 px-5 bg-green-400 rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition"
          >
            <img src="/pause.svg" className="w-5 h-5" alt="Pause" />
          </button>
        )}

        <button
          type="button"
          onClick={reset}
          className="h-12 px-6 bg-gray-300 rounded-full shadow-sm text-sm font-semibold hover:shadow-md transition"
        >
          Reset
        </button>
      </form>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {splitDigits(hours).map((d, i) => (
                <FlipTimer key={"h" + i} value={Number(d)} />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-600 tracking-wide">
              HOURS
            </p>
          </div>

          <p className="text-[9rem] leading-none text-gray-300 font-light select-none">
            :
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {splitDigits(minutes).map((d, i) => (
                <FlipTimer key={"m" + i} value={Number(d)} />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-600 tracking-wide">
              MINUTES
            </p>
          </div>

          <p className="text-[9rem] leading-none text-gray-300 font-light select-none">
            :
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {splitDigits(seconds).map((d, i) => (
                <FlipTimer key={"s" + i} value={Number(d)} />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-600 tracking-wide">
              SECONDS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
