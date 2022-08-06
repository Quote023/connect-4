import { Container, VStack } from '@chakra-ui/react';
import Board from 'components/Board';
import GameControls from 'components/GameControls';
import GameProgress from 'components/GameProgress';
import {FC} from 'react';

const Game: FC = () => {
  return (
    <Container py={4} as={VStack}>
      <Board />
      <GameProgress />
      <GameControls />
    </Container>
  );
}

export default Game;