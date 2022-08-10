import { Button, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import ColorSelectInput from 'components/ColorSelectInput';
import FormInput from 'components/FormInput';
import { p1Palette, p2Palette } from 'const';
import useResetGame from 'hooks/useResetGame';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { playersDataState } from 'state';
import { Player, PlayerInfo } from 'types';

type vWrapper<T> = { value: T }

type PlayerInfoForm = {
  p1Name: vWrapper<string>,
  p1Color: vWrapper<string>,
  p2Name: vWrapper<string>,
  p2Color: vWrapper<string>,
  new: vWrapper<0|1>,
}

/**
 * @author Alex
 * I chose to use the uncontrolled inputs here because this is a simple form that i don't need extense validation.
 * i'd probably use Unform, react-hook-form or Formik to extend this behaviour 
 * if i ever need more control (for validation or interaction between inputs) or more type-safeness
 */

const Menu: React.FC = () => {
  const setPlayersData = useSetRecoilState(playersDataState)
  const handleNewGame = useResetGame();
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.target as (typeof e.target & PlayerInfoForm)
    const newData: Record<Player,PlayerInfo> = {
      1: { num: 1, color: elements.p1Color.value, name: elements.p1Name.value },
      2: { num: 2, color: elements.p2Color.value, name: elements.p2Name.value }
    }
    setPlayersData(newData)
    if(elements.new.value === 1) handleNewGame();
    
    navigate("/game");
  }

  return (
    <Container as={VStack}>
      <Heading as="h1" size="lg">Connect-4</Heading>
      <form onSubmit={handleSubmit}>
      <VStack spacing={10}>
        <FormInput
          isRequired
          label="Player 1:"
          name="p1Name"
          placeholder='player name'
          helperText={<ColorSelectInput name="p1Color" defaultValue={p1Palette[0]} colors={p1Palette} />}
        />
        <FormInput
          isRequired
          label="Player 2:"
          placeholder='player name'
          helperText={<ColorSelectInput name="p2Color" defaultValue={p2Palette[0]} colors={p2Palette} />}
          name="p2Name"
        />
        <HStack>
           <Button colorScheme="green" name="new" value={1} type="submit">New Game</Button>
           <Button name="new" value={0} type="submit">Continue</Button>
        </HStack>
        </VStack> 
      </form>
    </Container>
  )
}

export default Menu;