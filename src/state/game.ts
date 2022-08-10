import { boardCols, defaultPlayerName, p1Palette, p2Palette } from "const";
import { atom } from "recoil";
import { Board, GameHistory, Player, PlayerData } from "types";
import { localStorageEffect } from "./effects";


export const gameHistoryState = atom<GameHistory>({
  key: "gameHistoryState",
  default: [],
  effects: [localStorageEffect("gameHistory")]
});


export const playSequenceState = atom<number[]>({
  key: "playSequenceState",
  default: [],
  effects: [localStorageEffect("currentPlaySequence")]
});

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
  effects: [localStorageEffect("currentBoard")]
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
  effects: [localStorageEffect("currentPlayer")]
});

export const playersDataState = atom<Record<Player,PlayerData>>({
  key: "playersDataState",
  default: {
   1: {num: 1, color: p1Palette[0], name: defaultPlayerName[1]},
   2: {num: 2, color: p2Palette[0], name: defaultPlayerName[2]}
  },
  effects: [localStorageEffect("currentPlayersData")]
})

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
  effects: [localStorageEffect("currentGameOver")]
});
