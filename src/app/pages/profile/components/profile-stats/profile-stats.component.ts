import {Component, Input, OnInit} from '@angular/core';
import {ProfileInformationInterface, ProfileStatisticInterface} from "src/app/pages/profile/interfaces/profile";

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent implements OnInit {

  private _info?: ProfileInformationInterface;
  @Input() set info(v: ProfileInformationInterface) {
    this._info = v
  }
  get info(): ProfileInformationInterface {
    return this._info!
  }

  private _statistics?: ProfileStatisticInterface;
  @Input() set statistics(v: ProfileStatisticInterface) {
    this._statistics = v
  }
  get statistics(): ProfileStatisticInterface {
    return this._statistics!
  }

  constructor() { }

  ngOnInit(): void {
  }

}
