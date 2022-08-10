import { useResetRecoilState } from "recoil";
import { boardState, playerState, gameOverState } from "state";


const useResetGame = () => {
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);

  return () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  }
}


export default useResetGame;