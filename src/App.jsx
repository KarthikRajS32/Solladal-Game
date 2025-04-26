import React, { useState, createContext, useEffect } from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import boardDefault from "./Components/Words";
import TamilKeyboard from "./Components/TamilKeyboard";
import tamilWords from "./Components/TamilWords";

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

  const [isGameOver, setIsGameOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tamilWords.length);
    const word = tamilWords[randomIndex];
    setRandomWord(word);
    console.log(word);
  }, []);

  const handleKeyPress = (keyVal, isMei = false) => {
    if (isGameOver || isSuccess) return; // Don't allow typing after success or game over

    let attempt = currAttempt.attempt;
    let letterPos = currAttempt.letterPos;

    if (lockedRows[attempt]) return; // Prevent typing if row is locked

    if (letterPos > 4) return; // Max 5 letters

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
    if (currAttempt.letterPos !== 5) return; // Only check if full word

    const currentWord = board[currAttempt.attempt].join(""); // Join the current row letters

    if (currentWord === randomWord) {
      setIsSuccess(true);
      const newLockedRows = [...lockedRows];
      newLockedRows[currAttempt.attempt] = true;
      setLockedRows(newLockedRows);
      return;
    } else {
      const newLockedRows = [...lockedRows];
      newLockedRows[currAttempt.attempt] = true;
      setLockedRows(newLockedRows);

      if (currAttempt.attempt >= 4) {
        setIsGameOver(true);
      } else {
        setCurrAttempt({
          attempt: currAttempt.attempt + 1,
          letterPos: 0,
          lastMeiPos: null,
        });
      }
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
        }}
      >
        <Board />
        <TamilKeyboard />
        {isSuccess && (
          <div className="text-green-600 text-center font-bold text-2xl mt-4">
            வெற்றி பெற்றீர்கள்! 🎉
          </div>
        )}
        {isGameOver && (
          <div className="text-red-600 text-center font-bold text-2xl mt-4">
            வீணாகிவிட்டது! 😢
          </div>
        )}
      </AppContext.Provider>
    </div>
  );
};

export default App;

