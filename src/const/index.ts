import { Player } from "types";

export const boardCols = 7;
export const boardRows = 6;

export const p1Palette = ["#f10000", "#00f100", "#0000f1","#f5f5d5"]
export const p2Palette = ["#ece100", "#e100ec", "#00ece1","#111111"]

export const defaultPlayerName: Record<Player, string> = {
  1: "Player 1",
  2: "Player 2",
};
