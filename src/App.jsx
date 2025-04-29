import React, { useState, createContext, useEffect } from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import boardDefault from "./Components/BoardDefault";
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
    console.log(word);
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
   if (currAttempt.letterPos !== 5) return; // Only check after 5 letters

   const currentWord = board[currAttempt.attempt].join(""); // User's guess
   const correctWord = randomWord; // Correct word

   // Array to store letter statuses
   const newStatus = ["", "", "", "", ""];
   const usedIndices = new Set(); // Track which correct letters have been matched

   // First pass: Check for EXACT matches in correct position (GREEN)
   for (let i = 0; i < 5; i++) {
     if (currentWord[i] === correctWord[i]) {
       newStatus[i] = "correct"; // Exact match → GREEN
       usedIndices.add(i); // Mark this position as used
     }
   }

   // Second pass: Check for EXACT matches in wrong positions (YELLOW)
   for (let i = 0; i < 5; i++) {
     if (newStatus[i] === "") {
       // Skip already marked letters
       for (let j = 0; j < 5; j++) {
         // If the letter matches exactly and hasn't been used yet
         if (!usedIndices.has(j) && currentWord[i] === correctWord[j]) {
           newStatus[i] = "present"; // Exact match but wrong position → YELLOW
           usedIndices.add(j); // Mark this correct letter as used
           break;
         }
       }
     }
   }

   // Third pass: Mark remaining letters as ABSENT (GRAY)
   for (let i = 0; i < 5; i++) {
     if (newStatus[i] === "") {
       newStatus[i] = "absent"; // No match → GRAY
     }
   }

   // Update the board status
   const updatedStatuses = [...letterStatus];
   updatedStatuses[currAttempt.attempt] = newStatus;
   setLetterStatus(updatedStatuses);

   // Lock the row after checking
   const newLockedRows = [...lockedRows];
   newLockedRows[currAttempt.attempt] = true;
   setLockedRows(newLockedRows);

   // Check if the word is correct
   if (currentWord === correctWord) {
     setIsSuccess(true);
   } else if (currAttempt.attempt >= 4) {
     setIsGameOver(true);
   } else {
     // Move to the next attempt
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
        <TamilKeyboard />
        {isSuccess && (
          <div className="text-green-600 text-center font-bold text-2xl mt-4">
            வாழ்த்துக்கள்! சரியான விடை..
          </div>
        )}
        {isGameOver && (
          <div className="text-red-600 text-center font-bold text-2xl mt-4">
            முயற்சிக்கு வாழ்த்துக்கள்...
          </div>
        )}
      </AppContext.Provider>
    </div>
  );
};

export default App;