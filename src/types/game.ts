export type Player = 1 | 2;
export type Board = Player[][];

export type PlayerData = {
  num: Player;
  name: string;
  color: string;
}

export type GameInfo = {
  id: string;
  board: Board,
  winner: Player | 0
  sequence: Number[],
  players: Record<Player,PlayerData>
}
export type GameHistory = GameInfo[];