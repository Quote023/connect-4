import { boardCols, defaultPlayerName, p1Palette, p2Palette } from "const";
import { atom, AtomEffect } from "recoil";
import { Board, Player, PlayerInfo as PlayerData } from "types";

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

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
