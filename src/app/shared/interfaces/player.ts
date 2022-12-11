export interface OldPlayerInterface {
  name: string;
  countryAcr: string;
  seed: string | null;
  id: string;
  image: string;
  stat?: OldPlayerInformationInterface;
}

export interface PlayerInterface {
  name: string;
  countryAcr: string;
  seed: string | null;
  odd: number | null;
  id: number;
  image: string;
  stats?: PlayerInformationInterface;
}

export interface OldPlayerInformationInterface {
  first_serve: number;
  first_serve_of: number;
  aces: number;
  double_faults: number;
  first_server_won: number;
  first_server_won_of: number;
  second_server_won: number;
  second_server_won_of: number;
  bpw: number;
  bpw_of: number;
  rpw: number;
  rpw_of: number;
  total_points_won: number;
}

export interface PlayerInformationInterface {
  firstServe: number;
  firstServeOf: number;
  aces: number;
  doubleFaults: number;
  unforcedErrors: number;
  winningOnFirstServe: number;
  winningOnFirstServeOf: number;
  winningOnSecondServe: number;
  winningOnSecondServeOf: number;
  winners: number;
  breakPointsConverted: number;
  breakPointsConvertedOf: number;
  netApproaches: number;
  netApproachesOf: number;
  totalPointsWon: number;
  fastestServe: number;
  averageFirstServeSpeed: number;
  averageSecondServeSpeed: number;
}
