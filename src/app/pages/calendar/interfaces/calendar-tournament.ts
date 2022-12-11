import {OldPlayerInterface, PlayerInterface} from "src/app/shared/interfaces/player";

export interface NewGameInterface {
  player1: PlayerInterface;
  player2: PlayerInterface;
}

export interface CalendarTournamentInterface {
  court: string;
  country: string;
  prize: string;
  date: string;
  name: string;
  colorStatus: string;
  winner: OldPlayerInterface;
  final?: NewGameInterface
}
