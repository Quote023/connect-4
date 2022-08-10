import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, playerState,playersDataState } from "state";

const GameProgress: FC = () => {
  const player = useRecoilValue(playerState);
  const {isOver,isDraw} = useRecoilValue(gameOverState);
  const playersData = useRecoilValue(playersDataState);
  const name = playersData[player].name;

  return (
    <Heading as="h3" size="lg">
      {isDraw ? "Draw!" :  isOver ? `${name} wins!` : `${name}'s turn`}
    </Heading>
  );
};

export default GameProgress;
