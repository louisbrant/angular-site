import {SportsmanFullInterface} from "./sportsman";
import {OddsScrInterface} from "./odds-scr";

export interface MatchInterface {
  winner: SportsmanFullInterface;
  looser: SportsmanFullInterface;
  oddsScr: OddsScrInterface;
  h2h: string;
}
