import {ProfileServiceStatsInterface} from "./profile-service-stats";
import {ProfileReturnStatsInterface} from "./profile-return-stats";
import {ProfileBreakPointsRtnInterface, ProfileBreakPointsServeInterface} from "./profile-break-points";

export interface OldProfileMatchStatInterface {
  player_wins_count_on_win: number;
  opp_wins_count_on_win: number;
  service_stats: ProfileServiceStatsInterface;
  return_stats: ProfileReturnStatsInterface;
  break_points_serve: ProfileBreakPointsServeInterface;
  break_points_rtn: ProfileBreakPointsRtnInterface;
}

export interface MatchStatPositionInterface {
  value: number;
  count: number;
}

export interface MatchStatServiceInterface {
  acesGm: MatchStatPositionInterface;
  doubleFaultsGm: MatchStatPositionInterface;
  firstServe: MatchStatPositionInterface;
  winningOnFirstServe: MatchStatPositionInterface;
  winningOnSecondServe: MatchStatPositionInterface;
  srwPtsWin: MatchStatPositionInterface;
}

export interface MatchStatReturnInterface {
  opponentAcesGm: MatchStatPositionInterface;
  opponentDoubleFaultsGm: MatchStatPositionInterface;
  opponentFirstServe: MatchStatPositionInterface;
  opponentWinningOnFirstServe: MatchStatPositionInterface;
  opponentWinningOnSecondServe: MatchStatPositionInterface;
  opponentSrwPtsWin: MatchStatPositionInterface;
}

export interface MatchStatBreakpointServeInterface {
  breakPointSavedGm: MatchStatPositionInterface;
  breakPointFacedGm: MatchStatPositionInterface;
  breakPointSave: MatchStatPositionInterface;
  serviceHold: MatchStatPositionInterface;
}

export interface MatchStatBreakPointRtnInterface {
  breakPointWonGm: MatchStatPositionInterface;
  breakPointChanceGm: MatchStatPositionInterface;
  breakPointWon: MatchStatPositionInterface;
  opponentHold: MatchStatPositionInterface;
}

export interface ProfileMatchStatInterface {
  games: number;
  serviceStats: MatchStatServiceInterface;
  returnStats: MatchStatReturnInterface;
  breakPointsServe: MatchStatBreakpointServeInterface;
  breakPointsRtn: MatchStatBreakPointRtnInterface
}

export interface ProfileMatchStatFiltersInterface {
  year: string;
  level?: string;
  court?: string;
  round?: string;
}
