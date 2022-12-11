import {CountryInterface} from "src/app/shared/interfaces/country";

export interface ProfileInformationInterface {
  name: string;
  birthday: string;
  currentRank: number | null;
  type: string;
  information: {
    turnedPro: string;
    weight: string;
    height: string;
    birthplace: string;
    residence: string;
    plays: string;
    coach: string;
    site: string;
    twitter: string;
    instagram: string;
    facebook: string;
    backhand: string;
    playerStatus: string;
  };
  country: CountryInterface;
  image: string;
  finalYears: string[];
}

export interface ProfileStatisticInterface {
  recentGames: ('l' | 'w')[];
  currentRank: number | null;
  bestRank: {
    position: string | null;
    date: string | null;
  };
  mainTours: string;
  tourFinals: string;
  master: string;
  grandSlam: string;
  total: string;
  cups: string;
  favouriteCourt: {
    wins: number;
    losses: number;
    surfaceId: number;
    surface: string;
  }
  challengers: string;
  futures: string;
  totalTitles: string;
}
