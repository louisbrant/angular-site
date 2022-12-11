import {WLInterface} from "src/app/shared/interfaces/win-lose";

export interface ProfileSurfaceSummaryInterface {
  year: number;
  sum: WLInterface;
  hard: WLInterface;
  clay: WLInterface;
  ihard: WLInterface;
  grass: WLInterface;
}
