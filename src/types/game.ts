export type Player = 1 | 2;
export type Board = Player[][];

export type PlayerInfo = {
  num: Player;
  name: string;
  color: string;
}