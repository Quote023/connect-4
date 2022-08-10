import { boardCols, defaultPlayerName, p1Palette, p2Palette } from "const";
import { atom, selector } from "recoil";
import { Board, GameHistory, GameOverState, Player, PlayerData } from "types";
import { localStorageEffect } from "./effects";


/** 
 * @author Alex 
 * On a real production setup 
 * the extra information about the match, like the play sequence and the board state could be stored on a cdn.
 * it's not something that needs to be easily available and can get big real quick depending on the number of players
 * (if i want to see the board of a previous game i can just go to <cdn>/history/<matchid>.json and get the desired info)
*/
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

export const gameOverState = atom<GameOverState>({
  key: "gameOverState",
  default: {isOver: false, isDraw: false},
  effects: [localStorageEffect("currentGameOver")]
});

export const isOverState = selector({
  key: 'isOverState',
  get: ({get}) => {
    const {isDraw,isOver} = get(gameOverState);
    return isOver || isDraw;
  },
});
