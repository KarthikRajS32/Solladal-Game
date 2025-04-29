import React, { useContext } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, letterStatus } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const status = letterStatus[attemptVal][letterPos];

  // Determine the background color based on the status
  const getBgColor = () => {
    if (status === "correct") return "bg-green-500 text-white"; // Green for correct position
    if (status === "present") return "bg-yellow-400 text-white"; // Yellow for wrong position
    if (status === "absent") return "bg-gray-400 text-white"; // Gray for absent letter
    return "bg-white"; // Default empty state
  };

  return (
    <div
      className={`flex w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 rounded-lg border-gray-400 m-[1px] sm:m-[3px] md:m-[5px] grid place-items-center text-[12px] sm:text-xl font-bold ${getBgColor()}`}
    >
      {letter}
    </div>
  );
};

export default Letter;
