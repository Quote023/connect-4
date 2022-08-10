import { GameHistory, GameInfo } from "types";

export type Winner = {name: string, wins: number}

const groupWinners = (allPlayers: Record<string,Winner>,game: GameInfo) => {
  if(game.winner === 0) return allPlayers; //in case of a draw 
  const winner = game.players[game.winner].name;
  allPlayers[winner] = {name:winner, wins: (allPlayers[winner]?.wins ?? 0) + 1}  
  return allPlayers;
}

export const historyToWinCount =  (histroy: GameHistory) =>{ 
  const winnersMap = histroy.reduce(groupWinners,{});
  const winnerList = Object.values(winnersMap);
  return winnerList.sort((a,b) => b.wins - a.wins);
}