import './App.css'

import { useState } from 'react';
import confetti from 'canvas-confetti';

import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';

import Square from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { resetGameStorage, saveGameToStorage } from './logic/storage';

function App() {
  const [board, setBoard] = useState(() => {
    //console.log('render')
    //console.log('Start board')

    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null); // null -> no winner, false -> draw


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }


  const updateBoard = (index) => {
    // We don´t want to update the board if the square is already selected
    if (board[index] || winner) return;

    // Update the board
    const newBoard = [...board];
    newBoard[index] = turn; // x u o
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // Save game here
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // Check if there is a winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // draw
    }
  }

  /* console.log(board); */

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App;
