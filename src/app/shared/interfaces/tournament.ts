import {CountryInterface} from "src/app/shared/interfaces/country";
import {CourtInterface} from "src/app/shared/interfaces/court";
import {RankInterface} from "src/app/shared/interfaces/rank";
import {OldDrawInterface} from "./draw";

export interface OldCountryInterface {
    name: string;
    code: string;
}

export interface SurfaceInterface {
    title: string
}

export interface TournamentInfoInterface {
    rank: string;
    country: OldCountryInterface;
    start_date: string;
    surfaces: SurfaceInterface
    prize: string;
}

export interface MostVictoriesPlayerInterface {
    name: string;
    country: string;
    image: string;
}

export interface MostVictoriesInterface {
    player: MostVictoriesPlayerInterface
    victories: number
}

export interface PointsInterface {
    points: number;
    prize: number;
}

export interface PointsStatInterface {
    winner: PointsInterface
    finalist: PointsInterface
    sf: PointsInterface
    qf: PointsInterface
    fourth: PointsInterface
}

export interface OldTournamentInterface {
    years: string[];
    name: string;
    ID_T: number;
    points: PointsStatInterface;
    most_victories: MostVictoriesInterface[];
    info: TournamentInfoInterface;
    draws: OldDrawInterface;
    past_champions: OldDrawInterface;
}

export interface TournamentInterface {
  id: number;
  name: string;
  prize: string;
  date: Date;
  court: CourtInterface;
  rank: RankInterface;
  country: CountryInterface;
}

export interface ShortTournamentInterface {
  name: string;
  date?: string;
  court: {id: number,name: string}
}

export interface PointDetailInterface {
  points: number | null;
  prize: number | null;
}

export interface PointInterface {
  winner: PointDetailInterface;
  finalist: PointDetailInterface;
  semiFinalist: PointDetailInterface;
  quarterFinalist: PointDetailInterface;
  fourth: PointDetailInterface;
  third: PointDetailInterface;
  second: PointDetailInterface;
  first: PointDetailInterface;
  qualifying: PointDetailInterface;
  qualifyingSecond: PointDetailInterface;
  qualifyingFirst: PointDetailInterface;
  preQualifying: PointDetailInterface;
}
