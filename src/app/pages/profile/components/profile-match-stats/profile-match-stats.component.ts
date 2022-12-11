import { Component, Input, OnInit } from '@angular/core';
import { ProfileInformationInterface } from "src/app/pages/profile/interfaces/profile";

@Component({
  selector: 'app-profile-match-stats',
  templateUrl: './profile-match-stats.component.html',
  styleUrls: ['./profile-match-stats.component.scss']
})
export class ProfileMatchStatsComponent implements OnInit {
  constructor() { }
  profile?: ProfileInformationInterface;
  _info: ProfileInformationInterface | undefined;

  @Input() type: string | undefined
  ngOnInit(): void {
    this.profile = undefined;
  }
  @Input() set info(v: ProfileInformationInterface | undefined) {
    if (v) {
      this._info = v;
    }
  }
  get info(): ProfileInformationInterface | undefined {
    return this._info
  }
}
