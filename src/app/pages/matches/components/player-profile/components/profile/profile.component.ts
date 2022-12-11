import { Component, Input, OnInit } from '@angular/core';
import { PastChampionInterface } from "src/app/shared/interfaces/past-champions";
import { TabActiveInterface } from "src/app/shared/interfaces/tab-active";
import { ProfileInformationInterface, ProfileStatisticInterface } from "src/app/pages/profile/interfaces/profile";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  recentForm: boolean[] = []
  title: number = 0
  other: number = 0

  private _info: ProfileInformationInterface | undefined;
  @Input() set info(v: ProfileInformationInterface | undefined) {
    if (v) {
      this._info = v;
    }
  }
  get info(): ProfileInformationInterface | undefined {
    return this._info
  }

  private _statistics: ProfileStatisticInterface | undefined;
  @Input() set statistics(v: ProfileStatisticInterface | undefined) {
    if (v) {
      this._statistics = v;
      this.other = Number(this._statistics?.mainTours?.split('-')![0]) + Number(this._statistics?.tourFinals?.split('-')![0]) + Number(this._statistics?.tourFinals?.split('-')![0]) + Number(this._statistics?.challengers?.split('-')![0]) + Number(this._statistics?.futures?.split('-')![0]);
      this.recentForm = v.recentGames.reverse().map(result => result == 'w').slice(0, 10)
      this.title = this.getWins([v.grandSlam, v.mainTours, v.master, v.cups, v.challengers, v.futures])
    }
  }
  get statistics(): ProfileStatisticInterface | undefined {
    return this._statistics
  }

  constructor() { }

  ngOnInit(): void {
  }

  private getWins(stat: string[]): number {
    return stat.map(v => parseInt(v.split('-')![0]) || 0).reduce((a, b) => a + b)
  }

  formatBestRank(bestRank: any) {
    return bestRank?.position ? `${bestRank.position} (${bestRank.date})` : '-';
  }
}
