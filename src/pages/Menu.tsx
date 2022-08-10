import { Button, Checkbox, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import ColorSelectInput from 'components/ColorSelectInput';
import FormInput from 'components/FormInput';
import { p1Palette, p2Palette } from 'const';
import useResetGame from 'hooks/useResetGame';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { boardState, gameOverState, playersDataState } from 'state';
import { Player, PlayerData } from 'types';

type vWrapper<T> = { value: T }

type PlayerInfoForm = {
  p1Name: vWrapper<string>,
  p1Color: vWrapper<string>,
  p2Name: vWrapper<string>,
  p2Color: vWrapper<string>,
  newGame: {checked: boolean},
}

/**
 * @author Alex
 * I chose to use the uncontrolled inputs here because this is a simple form that i don't need extense validation.
 * i'd probably use Unform, react-hook-form or Formik to extend this behaviour 
 * if i ever need more control (for validation or interaction between inputs) or more type-safeness
 */

const Menu: React.FC = () => {
  const [playersData,setPlayersData] = useRecoilState(playersDataState)
  const board = useRecoilValue(boardState);
  const {isDraw,isOver} = useRecoilValue(gameOverState);
  const handleNewGame = useResetGame();
  const navigate = useNavigate();
  const gameOver = isOver || isDraw 
  const onGoingGame = board.some((col) => col.length) && !gameOver;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.target as (typeof e.target & PlayerInfoForm)
    const newData: Record<Player,PlayerData> = {
      1: { num: 1, color: elements.p1Color.value, name: elements.p1Name.value },
      2: { num: 2, color: elements.p2Color.value, name: elements.p2Name.value }
    }
    setPlayersData(newData)
    if(elements.newGame.checked) handleNewGame();
    
    navigate("/game");
  }

  return (
    <Container as={VStack} py={4}>
      <Heading as="h1" size="lg">Connect-4</Heading>
      <form onSubmit={handleSubmit}>
      <VStack spacing={10}>
        <FormInput
          isRequired
          label="Player 1:"
          name="p1Name"
          placeholder='player name'
          defaultValue={playersData[1].name}
          helperText={<ColorSelectInput name="p1Color" defaultValue={playersData[1].color} colors={p1Palette} />}
        />
        <FormInput
          isRequired
          label="Player 2:"
          placeholder='player name'
          defaultValue={playersData[2].name}
          helperText={<ColorSelectInput name="p2Color" defaultValue={playersData[2].color} colors={p2Palette} />}
          name="p2Name"
        />
        <HStack>
           <Checkbox name="newGame" disabled={!onGoingGame} defaultChecked={!onGoingGame}>New Game</Checkbox>
           <Button type="submit">Start</Button>
        </HStack>
        </VStack> 
      </form>
      <Button mt="1rem" onClick={() => navigate("/leaderboards")}>Leaderboards</Button>
    </Container>
  )
}

export default Menu;