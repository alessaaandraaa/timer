import { useState } from "react";
import TimerInput from "./components/TimerInput.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TimerInput />
    </>
  );
}

export default App;
