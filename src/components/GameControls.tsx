import { Button } from "@chakra-ui/react";
import useResetGame from "hooks/useResetGame";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState } from "state";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const handleReset = useResetGame();

  return (
    <Button onClick={handleReset} isDisabled={!board.some((col) => col.length)}>
      Reset
    </Button>
  );
};

export default GameControls;
