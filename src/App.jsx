import React, { useState, createContext } from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import boardDefault from "./Components/Words";
import TamilKeyboard from "./Components/TamilKeyboard";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [inputText, setInputText] = useState("");

  return (
    <div>
      <Header />
      <AppContext.Provider value={{ board, setBoard, inputText, setInputText }}>
        <Board />
        <TamilKeyboard />
      </AppContext.Provider>
    </div>
  );
};

export default App;

