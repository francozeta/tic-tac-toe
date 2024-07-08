import { WINNERS_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Check if there is a winner 
  for (const combo of WINNERS_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] && // 0 -> x u o
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null; // If there is no winner, return null
  
}

export   const checkEndGame = (newBoard) => {
  //Check if the game is draw
  // if the board is full and no winner
  return newBoard.every((square) => square !== null);
}