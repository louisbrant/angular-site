import {SportsmanInfoInterface} from "./short-info";

export interface ChampionInterface {
  year: string;
  champion: SportsmanInfoInterface;
  runnerUp: SportsmanInfoInterface;
  score: string;
}
