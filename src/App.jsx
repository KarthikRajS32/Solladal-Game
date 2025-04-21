import React, { useState } from 'react'
import Header from './Components/Header'
import Board from './Components/Board'
import boardDefault from './Components/Words'
import { createContext } from 'react'
import TamilKeyboard from './Components/TamilKeyboard'

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div>
      <Header />
      <AppContext.Provider value={{ board, setBoard }}>
        <Board />
        <TamilKeyboard/>
      </AppContext.Provider>
    </div>
  );
}

export default App
