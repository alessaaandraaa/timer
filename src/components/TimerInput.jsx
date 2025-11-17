import { useState } from "react";
import TimerDisplay from "./TimerDisplay";
export default function TimerInput() {
  const [time, setTime] = useState([0, 0, 0]);

  const onSubmit = (event) => {
    event.preventDefault();
    const hours = parseInt(event.target.hours.value);
    const minutes = parseInt(event.target.minutes.value);
    const seconds = parseInt(event.target.seconds.value);
    const newTime = hours * 3600 + minutes * 60 + seconds;
    console.log(newTime);

    setTime(newTime);
  };

  function reset() {
    setTime(0);
  }

  return (
    <div>
      <div className="bg-white shadow-md border rounded-2xl p-5">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="hours">Hours: </label>
            <input
              type="number"
              name="hours"
              placeholder="hours"
              htmlFor="hours"
              id="hours"
              className="border rounded-2xl p-1 pl-3"
              min="0"
              defaultValue="0"
            ></input>
          </div>
          <div>
            <label htmlFor="minutes">Minutes: </label>
            <input
              type="number"
              name="minutes"
              placeholder="minutes"
              htmlFor="minutes"
              id="minutes"
              className="border rounded-2xl p-1 pl-3"
              min="0"
              defaultValue="0"
            ></input>
          </div>
          <div>
            <label htmlFor="seconds">Seconds: </label>
            <input
              type="number"
              name="seconds"
              placeholder="seconds"
              htmlFor="seconds"
              id="seconds"
              className="border rounded-2xl p-1 pl-3"
              min="0"
              defaultValue="0"
            ></input>
          </div>
          <input
            type="submit"
            className="rounded-md border p-1 pl-1.5 pr-1.5 mt-2 bg-gray-600 text-white hover:bg-black"
          ></input>
        </form>
        <div className="flex items-start">
          <button
            className="rounded-md border p-1 pl-1.5 pr-1.5 mt-2 hover:bg-red-500"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
      <TimerDisplay time={time} />
    </div>
  );
}
