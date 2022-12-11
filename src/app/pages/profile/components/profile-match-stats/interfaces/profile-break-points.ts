import {ProfileStatInterface} from "./profile-stat";

export interface ProfileBreakPointsServeInterface {
  bps_saved_gm: number;
  bps_faced_gm: number;
  bp_save: ProfileStatInterface;
  service_hold: ProfileStatInterface;
}

export interface ProfileBreakPointsRtnInterface {
  bpn_won_gm: number;
  bps_chance_gm: number;
  bp_won: ProfileStatInterface;
  opp_hold: ProfileStatInterface;
}
