import { useState } from "react";

export default function TimerInput() {
  const [time, setTime] = useState([0, 0, 0]);
  const [timeLeft, setTimeLeft] = useState(Number(time) || 0);
  const [pause, setPause] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const hours = parseInt(event.target.hours.value);
    const minutes = parseInt(event.target.minutes.value);
    const seconds = parseInt(event.target.seconds.value);
    const newTime = hours * 3600 + minutes * 60 + seconds;
    setTime(newTime);
  };

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
    if (time >= 0) setTimeLeft(newTime);
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
    <div className="space-y-14 max-w-[1700px] mx-auto px-6 md:px-12">

      {/* FORM */}
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md border border-[#E2DCC7] rounded-2xl p-6 space-y-5"
      >
        <div className="flex flex-wrap justify-center gap-6 text-base">

          <label className="flex items-center gap-2">
            Hours:
            <input
              type="number"
              name="hours"
              min="0"
              defaultValue="0"
              className="border border-[#E2DCC7] rounded-xl p-2 w-20"
            />
          </label>

          <label className="flex items-center gap-2">
            Minutes:
            <input
              type="number"
              name="minutes"
              min="0"
              defaultValue="0"
              className="border border-[#E2DCC7] rounded-xl p-2 w-20"
            />
          </label>

          <label className="flex items-center gap-2">
            Seconds:
            <input
              type="number"
              name="seconds"
              min="0"
              defaultValue="0"
              className="border border-[#E2DCC7] rounded-xl p-2 w-20"
            />
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#F7D774] hover:bg-[#F5C94A]
                       text-[#3A3A3A] font-semibold
                       w-48 py-3 rounded-full shadow"
          >
            Start Timer
          </button>
        </div>
      </form>

      {/* TIMER + IMAGE BOX */}
      <div className="bg-white shadow-md border border-[#E2DCC7] rounded-2xl p-10">

        <div
          className="
            grid gap-8
            grid-cols-1
            items-start
          "
        >

          {/* TIMER */}
          <div className="col-span-1 sm:col-span-3">
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
          </div>

        </div>

        {/* BUTTONS BELOW EVERYTHING */}
        {/* <div className="flex flex-wrap justify-center gap-6 mt-10"> */}

          {/* {pause ? (
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
          )} */}
        {/* </div> */}
      </div>
    </div>
  );
}
