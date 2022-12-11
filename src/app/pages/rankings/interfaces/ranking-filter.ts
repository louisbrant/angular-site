import {CountryInterface} from "src/app/shared/interfaces/country";
import {CourtInterface} from "src/app/shared/interfaces/court";

export interface RankingFilter {
  countries: CountryInterface[];
  date: Date[];
  surfaces: CourtInterface[];
}
