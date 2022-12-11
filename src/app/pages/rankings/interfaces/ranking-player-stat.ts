import {PlayerInterface} from "../../../shared/interfaces/player";


export interface RankingPlayerStatInterface {
  player: PlayerInterface;
  position: number;
  pts: number;
  wkPts: number;
  wk: number;
  yr: number;
  prize: string;
}
