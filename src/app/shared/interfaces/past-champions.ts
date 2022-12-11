import {PlayerInterface} from "src/app/shared/interfaces/player";
import {ShortTournamentInterface} from "src/app/shared/interfaces/tournament";

export interface PastChampionsResponseInterface {
  singlesChampions: PastChampionInterface[];
  doublesChampions: PastChampionInterface[];
}

export interface PastChampionInterface {
  roundId: number;
  result: string;
  date: Date;
  player1: PlayerInterface;
  player2: PlayerInterface;
  tournament: ShortTournamentInterface;
  h2h?: string;
}
