import { useResetRecoilState } from "recoil";
import { boardState, playerState, gameOverState, playSequenceState } from "state";


const useResetGame = () => {
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);
  const resetPlaySequence = useResetRecoilState(playSequenceState);

  return () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
    resetPlaySequence();
  }
}


export default useResetGame;