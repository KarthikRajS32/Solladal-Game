import React, { useContext } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  return (
    <div className="flex w-20 h-15 border-2 rounded-lg border-gray-400 m-[5px] grid place-items-center text-xl font-bold">
      {letter}
    </div>
  );
};

export default Letter;