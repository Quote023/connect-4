import { boardRows } from "const";
import {v4 as uuidv4} from "uuid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardState, gameHistoryState, gameOverState, isOverState, playersDataState, playerState, playSequenceState } from "state";
import { Board } from "types";

const getDiagonals = (board: Board,col: number, row: number) => {
  type LeftDiagonal  = number[];
  type RightDiagonal = number[];
  const diagonals: [LeftDiagonal,RightDiagonal] = [[],[]]
  const lStart = col - row, rStart = col + row

  for (let i = 0; i < boardRows; i++) {
    const leftCell = board[lStart + i]?.[i] ?? 0;
    const rightCell = board[rStart - i]?.[i] ?? 0;
    diagonals[0].push(leftCell)
    diagonals[1].push(rightCell)
  }

  return diagonals;
}

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [playSequence,setPlaySequence] = useRecoilState(playSequenceState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const playersData = useRecoilValue(playersDataState);
  const setGameHistory = useSetRecoilState(gameHistoryState);
  const setGameOver = useSetRecoilState(gameOverState);
  const gameOver = useRecoilValue(isOverState);
  console.log({draw: board.every(x => x.length >= boardRows)})
  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );
    const newSeq = [...playSequence, col];

    const row = newBoard[col].length - 1;
    const [ld,rd] = getDiagonals(newBoard,col,row)
    const hasWinner = (testWin(newBoard[col]) || testWin(newBoard.map((col) => col[row] || 0)) || testWin(ld) ||testWin(rd))
    const isDraw = newBoard.every(x => x.length >= boardRows)
    console.log({hasWinner, isDraw: true})
    if (hasWinner || isDraw) {
      setGameOver({isOver:true, isDraw: isDraw});
      setGameHistory(hs => [{
        id: uuidv4().split("-")[0],
        board: newBoard,
        sequence: newSeq,
        winner: isDraw ? 0 : player,
        players: playersData
      },...hs])
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }
    
    setPlaySequence(newSeq);
    setBoard(newBoard);
  };
};

export default usePlayPiece;
