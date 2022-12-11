import { OldPlayerInformationInterface, OldPlayerInterface, PlayerInterface } from "src/app/shared/interfaces/player";
import { ShortTournamentInterface } from "src/app/shared/interfaces/tournament";


export interface DrawInformationInterface {
  player_1: OldPlayerInformationInterface;
  player_2: OldPlayerInformationInterface;
}

export interface OldDrawMatchInterface {
  k1: number | null;
  k2: number | null;
  result: string;
  round: number;
  year: number;
  player_1: OldPlayerInterface;
  player_2: OldPlayerInterface;
  stat: DrawInformationInterface | null;
  h2h?: string;
  tournament_name?: string;
  tournament_date?: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

export interface DrawMatchInterface {
  roundId: number;
  result: string;
  date: string | null;
  player1: PlayerInterface;
  player2: PlayerInterface;
  tournament: ShortTournamentInterface;
  h2h?: string,
  odd1?: String,
  odd2?: String,
  draw: string
}

export interface OldDrawInterface {
  singles: OldDrawMatchInterface[];
  doubles: OldDrawMatchInterface[];
  qualifying: OldDrawMatchInterface[];
}

export interface DrawInterface {
  singles: DrawMatchInterface[];
  doubles: DrawMatchInterface[];
  qualifying: DrawMatchInterface[];
  singlesCount: number;
}
