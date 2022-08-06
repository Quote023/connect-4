import { boardCols, defaultPlayerColor, defaultPlayerName } from "const";
import { atom } from "recoil";
import { Board, Player, PlayerInfo as PlayerData } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const playersDataState = atom<Record<Player,PlayerData>>({
  key: "playersDataState",
  default: {
   1: {num: 1, color: defaultPlayerColor[1], name: defaultPlayerName[1]},
   2: {num: 2, color: defaultPlayerColor[2], name: defaultPlayerName[2]}
  }
})

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});
