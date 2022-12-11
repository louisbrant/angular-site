import {CourtInterface} from "src/app/shared/interfaces/court";
import {RankInterface} from "src/app/shared/interfaces/rank";
import {RoundInterface} from "src/app/shared/interfaces/round";

export interface MatchFiltersInterface {
  courts: CourtInterface[];
  rounds: RoundInterface[];
  level: RankInterface[]
  years: string[];
}
