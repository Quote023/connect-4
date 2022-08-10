import { defaultPlayerName, p1Palette, p2Palette } from "const";
import { historyToWinCount } from "helpers/historyToWinCount"
import { GameHistory, GameInfo } from "types";
import { v4 } from "uuid";

const makeGame = (): GameInfo => ({
  board: [],
  id: v4(),
  players: { 1: {num: 1, color: p1Palette[0], name: defaultPlayerName[1]}, 2: {num: 2, color: p2Palette[0], name: defaultPlayerName[2]}},
  sequence: [],
  winner: 1
})

test("should ignore games with no winner", () => {
  const data:GameHistory = [makeGame(),{...makeGame(),winner:0}]
  expect(historyToWinCount(data)).toHaveLength(1);
})

