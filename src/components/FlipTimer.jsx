"use client";
import { useEffect, useState, useRef } from "react";

export default function FlipTimer({ value }) {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  const queue = useRef([]);

  useEffect(() => {
    queue.current.push(value);
    runFlip();
  }, [value]);

  function runFlip() {
    if (flipping) return;
    if (queue.current.length === 0) return;

    const nextValue = queue.current.shift();
    if (nextValue === currentValue) {
      runFlip();
      return;
    }

    setPrevValue(currentValue);
    setFlipping(true);

    setTimeout(() => {
      setCurrentValue(nextValue);
    }, 300);

    setTimeout(() => {
      setFlipping(false);
      runFlip();
    }, 600);
  }

  return (
    <div className="relative w-36 h-52 perspective font-extrabold text-[12rem] leading-[1]">
      
      <div className="absolute top-0 w-full h-1/2 overflow-hidden bg-gray-900 text-white flex justify-center items-start rounded-t-xl pt-2">
        {currentValue}
      </div>

      <div className="absolute bottom-0 w-full h-1/2 overflow-hidden bg-gray-700 text-white flex justify-center items-end rounded-b-xl pb-2">
        {currentValue}
      </div>

      {flipping && (
        <div className="absolute inset-0">
          <div className="absolute top-0 w-full h-1/2 origin-bottom overflow-hidden bg-gray-900 text-white flex justify-center items-start animate-flip-top pt-2 rounded-t-xl">
            {prevValue}
          </div>

          <div className="absolute bottom-0 w-full h-1/2 origin-top overflow-hidden bg-gray-700 text-white flex justify-center items-end animate-flip-bottom pb-2 rounded-b-xl">
            {currentValue}
          </div>
        </div>
      )}
    </div>
  );
}
