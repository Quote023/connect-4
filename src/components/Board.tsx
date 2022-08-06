import { Circle, Flex } from "@chakra-ui/react";
import { boardRows } from "const";
import { usePlayPiece } from "hooks";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playerState,playersDataState } from "state";
import { Player } from "types";

const padCol = (col: number[]): number[] =>
  col.join("").padEnd(boardRows, "0").split("").map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playersData = useRecoilValue(playersDataState);
  return (
    <Flex justify="center">
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => (
            <Circle
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playersData[p as Player]?.color || "gray.300"}
            />
          ))}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playersData[player].color}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
