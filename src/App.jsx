import React, { useState, createContext, useEffect } from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import boardDefault from "./Components/BoardDefault";
import TamilKeyboard from "./Components/TamilKeyboard";
import tamilWords from "./Components/TamilWords";
import "./index.css";
import GraphemeSplitter from "grapheme-splitter";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [randomWord, setRandomWord] = useState("");
  const [lockedRows, setLockedRows] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
    lastMeiPos: null,
  });
  const [letterStatus, setLetterStatus] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tamilWords.length);
    const word = tamilWords[randomIndex];
    setRandomWord(word);
  }, []);

  const handleKeyPress = (keyVal, isMei = false) => {
    if (isGameOver || isSuccess) return;
    let attempt = currAttempt.attempt;
    let letterPos = currAttempt.letterPos;
    if (lockedRows[attempt]) return;
    if (letterPos > 4) return;

    const newBoard = [...board];
    newBoard[attempt][letterPos] = keyVal;
    setBoard(newBoard);

    setCurrAttempt({
      attempt,
      letterPos: letterPos + 1,
      lastMeiPos: isMei ? letterPos : null,
    });
  };

  const handleCombination = (combination, meiPos) => {
    const newBoard = [...board];
    newBoard[currAttempt.attempt][meiPos] = combination;
    setBoard(newBoard);

    setCurrAttempt((prev) => ({
      ...prev,
      lastMeiPos: null,
    }));
  };

  const handleDelete = () => {
    if (isGameOver || isSuccess) return;
    let attempt = currAttempt.attempt;
    let letterPos = currAttempt.letterPos;
    if (lockedRows[attempt]) return;
    if (letterPos === 0) return;

    const newBoard = [...board];
    const deletePos = letterPos - 1;
    newBoard[attempt][deletePos] = "";
    setBoard(newBoard);

    setCurrAttempt({
      attempt,
      letterPos: deletePos,
      lastMeiPos:
        currAttempt.lastMeiPos === deletePos ? null : currAttempt.lastMeiPos,
    });
  };

const handleCheckWord = () => {
  if (currAttempt.letterPos !== 5) return;

  const splitter = new GraphemeSplitter();
  const currentWordArr = splitter.splitGraphemes(
    board[currAttempt.attempt].join("")
  );
  const correctWordArr = splitter.splitGraphemes(randomWord);

  const newStatus = ["", "", "", "", ""];
  const usedIndices = new Set();

  // Step 1: Correct match (green)
  for (let i = 0; i < 5; i++) {
    if (currentWordArr[i] === correctWordArr[i]) {
      newStatus[i] = "correct";
      usedIndices.add(i);
    }
  }

  // Step 2: Present in word but wrong place (yellow)
  for (let i = 0; i < 5; i++) {
    if (newStatus[i] === "") {
      for (let j = 0; j < 5; j++) {
        if (
          !usedIndices.has(j) &&
          currentWordArr[i] === correctWordArr[j] &&
          currentWordArr[j] !== correctWordArr[j]
        ) {
          newStatus[i] = "present";
          usedIndices.add(j);
          break;
        }
      }
    }
  }

  // Step 3: Not in word at all (gray)
  for (let i = 0; i < 5; i++) {
    if (newStatus[i] === "") {
      newStatus[i] = "absent";
    }
  }

  const updatedStatuses = [...letterStatus];
  updatedStatuses[currAttempt.attempt] = newStatus;
  setLetterStatus(updatedStatuses);

  const newLockedRows = [...lockedRows];
  newLockedRows[currAttempt.attempt] = true;
  setLockedRows(newLockedRows);

  if (currentWordArr.join("") === correctWordArr.join("")) {
    setIsSuccess(true);
  } else if (currAttempt.attempt >= 4) {
    setIsGameOver(true);
  } else {
    setCurrAttempt({
      attempt: currAttempt.attempt + 1,
      letterPos: 0,
      lastMeiPos: null,
    });
  }
};

  return (
    <div>
      <Header />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          handleKeyPress,
          handleCombination,
          handleDelete,
          handleCheckWord,
          lockedRows,
          isGameOver,
          isSuccess,
          letterStatus,
        }}
      >
        <Board />
        {isSuccess && (
          <div className="text-green-600 text-center font-bold text-2xl mt-4 pb-4">
            வாழ்த்துக்கள்! <br /> சரியான விடை : {randomWord}
          </div>
        )}
        {isGameOver && (
          <div className="text-red-600 text-center font-bold text-2xl mt-4 pb-4">
            முயற்சிக்கு வாழ்த்துக்கள்... <br /> 
            <span className="text-green-600">சரியான விடை : {randomWord}</span>
          </div>
        )}
        <TamilKeyboard />
        
      </AppContext.Provider>
    </div>
  );
};

export default App;