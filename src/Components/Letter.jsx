import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, letterStatus } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const status = letterStatus[attemptVal][letterPos];

  const [flipped, setFlipped] = useState(false);
  const delay = letterStatus[attemptVal].includes("") ? 0 : letterPos * 200;

  useEffect(() => {
    if (status) {
      setTimeout(() => setFlipped(true), delay);
    }
  }, [status, delay]);

  const getColorClass = () => {
    if (status === "correct") return "bg-green-500 text-white";
    if (status === "present") return "bg-yellow-400 text-white";
    if (status === "absent") return "bg-gray-400 text-white";
    return "bg-white text-black";
  };

  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 m-[1px] sm:m-[3px] md:m-[5px] perspective-1000">
      <div
        className={`w-full h-full transition-transform duration-700 ease-in-out preserve-3d ${
          flipped ? "rotate-x-180" : ""
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Front face */}
        <div className="absolute w-full h-full flex items-center justify-center border-2 border-gray-400 rounded-lg bg-white text-black text-sm sm:text-xl font-bold backface-hidden">
          {letter}
        </div>

        {/* Back face */}
        <div
          className={`absolute w-full h-full flex items-center justify-center border-2 border-gray-400 rounded-lg rotate-x-180 text-sm sm:text-xl font-bold backface-hidden ${getColorClass()}`}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};

export default Letter;
