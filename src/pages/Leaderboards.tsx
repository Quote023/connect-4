import { Button, Container, Heading, HStack, Table, Tbody, Td, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { gameHistoryState } from 'state';


const Leaderboards: React.FC = () => {
  const gameHistory = useRecoilValue(gameHistoryState);
  const navigate = useNavigate();
  const groupedByName = useMemo(() => {
    const group = gameHistory.reduce((acc,cur) => {
      if(cur.winner === 0) return acc; //in case of a draw 
      const winner = cur.players[cur.winner].name;
      acc[winner] = {name:winner, wins: (acc[winner]?.wins ?? 0) + 1}  
      return acc;
    },{} as Record<string, {name:string,wins:number}>);
    
    const asList = Object.values(group);
    return asList.sort((a,b) => b.wins - a.wins);
  }, [gameHistory]);

  return (
    <Container py={4} >
        <VStack>
          <HStack w="100%" justify="space-between" >
            <Button onClick={() => navigate("/")}>Menu</Button>
            <Heading as="h1" size="lg">Leaderboards</Heading>
          </HStack>
        <Table>
          <Thead>
            <Tr>
              <Td>Player</Td>
              <Td>Wins</Td>
            </Tr>
          </Thead>
          <Tbody>
            {groupedByName.map(({name,wins}) => (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td>{wins}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  )
}

export default Leaderboards;