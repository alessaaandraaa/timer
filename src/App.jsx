import TimerInput from "./components/TimerInput.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="w-full min-h-screen px-6 py-10">

      <header className="w-full max-w-4xl mx-auto flex items-center justify-center gap-3 mb-10">
      </header>

      <TimerInput />
    </div>
  );
}
