import {DrawMatchInterface, OldDrawMatchInterface} from "./draw";

export interface OldGroupMatchesPlayedInterface {
  group?: string;
  matchPlayed?: OldDrawMatchInterface
}

export interface GroupMatchesPlayedInterface {
  group?: string;
  icon?: string;
  date?: string;
  tourName?: string;
  matchPlayed?: DrawMatchInterface;
}
