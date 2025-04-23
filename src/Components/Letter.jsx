import React, { useContext } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, inputText } = useContext(AppContext);
  const letter = board?.[attemptVal]?.[letterPos] || "";

  return (
    <div className="flex w-13 h-13 border-2 rounded-lg border-gray-400 m-[5px] grid place-items-center text-3xl font-bold">
      {inputText}
    </div>
  );
};

export default Letter;


