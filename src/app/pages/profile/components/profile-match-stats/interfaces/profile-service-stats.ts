import {ProfileStatInterface} from "./profile-stat";

export interface ProfileServiceStatsInterface {
  aces_gm: number;
  dfs_gm: number;
  first_serve: ProfileStatInterface;
  first_serve_won: ProfileStatInterface;
  second_serve_won: ProfileStatInterface;
  srw_pts_w: ProfileStatInterface;
}
