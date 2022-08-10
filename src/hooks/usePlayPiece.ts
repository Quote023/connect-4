import { boardRows } from "const";
import {v4 as uuidv4} from "uuid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardState, gameHistoryState, gameOverState, playersDataState, playerState, playSequenceState } from "state";
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
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const playersData = useRecoilValue(playersDataState);

  const setGameHistory = useSetRecoilState(gameHistoryState);


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
    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) ||// Did win horizontally
      testWin(ld) ||// Did win diagonally from the left
      testWin(rd)// Did win diagonally from the right
    ) {
      setGameOver(true);
      setGameHistory(hs => [...hs, {
        id: uuidv4().split("-")[0],
        board: newBoard,
        sequence: newSeq,
        winner: player,
        players: playersData
      }])
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }
    
    setPlaySequence(newSeq);
    setBoard(newBoard);
  };
};

export default usePlayPiece;
