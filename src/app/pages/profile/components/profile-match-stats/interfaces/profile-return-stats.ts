import {ProfileStatInterface} from "./profile-stat";

export interface ProfileReturnStatsInterface {
  opp_aces_gm: number;
  opp_dfs_gm: number;
  opp_first_serve: ProfileStatInterface;
  opp_1_rtn_won: ProfileStatInterface;
  opp_2_rtn_won: ProfileStatInterface;
  rtn_pts_w: ProfileStatInterface;
}
