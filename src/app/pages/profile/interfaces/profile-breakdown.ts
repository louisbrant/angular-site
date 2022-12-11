import {WLInterface} from "src/app/shared/interfaces/win-lose";

interface LevelBreakdownInterface {
  masters: WLInterface;
  mainTour: WLInterface;
  tourFinals: WLInterface;
  grandSlam: WLInterface;
  cups: WLInterface;
  futures: WLInterface;
  challengers: WLInterface;
}

interface RankBreakdownInterface {
  top1: WLInterface;
  top5: WLInterface;
  top10: WLInterface;
  top20: WLInterface;
  top50: WLInterface;
  top100: WLInterface;
}

interface UndefWLBreakdownInterface {
  [key: string]: {
    w?: number;
    l?: number;
  }
}

export interface ProfileBreakdownInterface {
  [key: string]: {
    court: UndefWLBreakdownInterface
    round: UndefWLBreakdownInterface
    rank: RankBreakdownInterface
    level: LevelBreakdownInterface
  }
}
