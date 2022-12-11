import {ROW_TYPES} from "./table";

export interface TournamentInfoInterface {
  stat: string;
  value: string;
  type?: ROW_TYPES;
  icon?: string;
}

export interface TournamentPointInterface {
  name: string;
  points: number | null;
  prize: number | null;
}

export interface SportsmanInfoInterface {
  fullname: string;
  countryCode: string;
  image?: string;
  value?: any;
}
