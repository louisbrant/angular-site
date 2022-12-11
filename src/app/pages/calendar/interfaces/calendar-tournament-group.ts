import {CalendarTournamentInterface} from "./calendar-tournament";

export interface CalendarTournamentGroupInterface {
  tournaments: CalendarTournamentInterface[];
  week: number;
  date: string;
}
