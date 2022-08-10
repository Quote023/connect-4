import {  Button, HStack } from "@chakra-ui/react";
import useResetGame from "hooks/useResetGame";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { boardState } from "state";

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const handleReset = useResetGame();
  const navigate = useNavigate();

  return (
    <HStack>
      <Button onClick={() => navigate("/")} >
        Menu
      </Button>
      <Button onClick={handleReset} colorScheme="red" isDisabled={!board.some((col) => col.length)}>
        Reset
      </Button>
    </HStack>
  );
};

export default GameControls;
