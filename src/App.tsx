import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationBG from "../src/assets/animations/Animation - 1715764101235 (1).json";
import startPauseBtn from "../src/assets/animations/Animation - 1715789897200.json";
import resetBtn from "../src/assets/animations/Animation - 1715789598799.json";
import lapBtn from "../src/assets/animations/Animation - 1715800701724.json";
import flagIcon from "../src/assets/animations/Animation - 1715864776859.json";

export default function App() {
  const startPauseBtnRef = useRef<any>(null);
  const resetBtnRef = useRef<any>(null);
  const lapBtnRef = useRef<any>(null);
  const flagIconRef = useRef<any>(null);
  const [isStartPausePlaying, setIsStartPausePlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutId, setTimeoutId] = useState();

  const handleClickStartPause = () => {
    if (startPauseBtnRef.current) {
      if (isStartPausePlaying) {
        startPauseBtnRef.current.pause();
        clearTimeout(timeoutId);
      } else {
        startPauseBtnRef.current.play();

        const id = setTimeout(() => {
          if (startPauseBtnRef.current) {
            startPauseBtnRef.current.pause();
            setIsStartPausePlaying(false);
          }
        }, 2130);
        setTimeoutId(id);
      }
      setIsStartPausePlaying(!isStartPausePlaying);
      setIsRunning(!isRunning);
    }
  };

  useEffect(() => {
    if (resetBtnRef.current) {
      resetBtnRef.current.goToAndStop(20, true);
    }
  }, []);

  const handleClickReset = () => {
    if (resetBtnRef.current) {
      resetBtnRef.current.play();

      setTimeout(() => {
        if (resetBtnRef.current) {
          resetBtnRef.current.pause();
          setTime(0);
        }
      }, 3000);
    }
  };

  const handleClickLap = () => {
    if (lapBtnRef.current) {
      lapBtnRef.current.play();

      setTimeout(() => {
        if (lapBtnRef.current) {
          lapBtnRef.current.pause();
        }
      }, 2000);
    }

    setLaps([...laps, time]);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  return (
    <div className="flex justify-center items-center h-full">
      <Lottie
        animationData={animationBG}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
      />
      <div className="flex flex-col justify-center w-4/5 h-3/5 gap-10 items-center">
        <h1 className="flex text-3xl justify-start items-start">STOPWATCH</h1>
        <div className="flex flex-col justify-center items-center gap-10 font-bold">
          <span className="text-7xl">
            {new Date(time * 1000).toISOString().substr(11, 8)}
          </span>

          <div className="flex justify-around w-full flex-1 text-2xl box-border">
            <button
              className="rounded-full p-1 text-indigo-900"
              onClick={handleClickReset}
            >
              <Lottie
                lottieRef={resetBtnRef}
                animationData={resetBtn}
                style={{ width: 70, height: 70 }}
                autoplay={false}
              />
            </button>
            <button
              className="rounded-full p-1 text-indigo-900"
              onClick={handleClickStartPause}
            >
              <Lottie
                lottieRef={startPauseBtnRef}
                animationData={startPauseBtn}
                style={{ width: 70, height: 70 }}
                autoplay={false}
              />
            </button>
            <button
              className="rounded-full p-1 text-indigo-900"
              onClick={handleClickLap}
            >
              <Lottie
                lottieRef={lapBtnRef}
                animationData={lapBtn}
                style={{ width: 70, height: 70 }}
                autoplay={false}
              />
            </button>
          </div>
        </div>
        <div className="overflow-auto h-48 text-3xl cursor-ns-resize scroll-smooth ">
          <ul className="flex gap-2 flex-col ">
            {laps.map((lap, index) => (
              <li
                key={index}
                className="flex flex-row gap-2.5  bg-indigo-900 rounded-full px-1 "
              >
                <Lottie
                  lottieRef={flagIconRef}
                  animationData={flagIcon}
                  style={{ width: 35, height: 35 }}
                  autoplay={true}
                />
                {new Date(lap * 1000).toISOString().substr(11, 8)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
