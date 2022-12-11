import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProfileInformationInterface, ProfileStatisticInterface } from "src/app/pages/profile/interfaces/profile";
import { OldDrawMatchInterface } from 'src/app/shared/interfaces/draw';
import { ProfileSurfaceSummaryInterface } from "./components/profile-match-stats/interfaces/profile-surface-summary";
import { OldProfileMatchStatInterface } from "./components/profile-match-stats/interfaces/profile-match-stat";
import { ProfileService } from "./services/profile.service";
import { ProfileInterestingH2hInterface } from "./interfaces/profile-interesting-h2h";
import { ProfileBreakdownInterface } from "./interfaces/profile-breakdown";
import { ProfileSinglesFinalsInterface } from "./interfaces/profile-singles-finals";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileInfoIsLoad = false;
  profileStatsIsLoad = false;
  profileLoadError = false;

  profile?: ProfileInformationInterface;
  statistics?: ProfileStatisticInterface;
  breakdown?: ProfileBreakdownInterface;
  finals: ProfileSinglesFinalsInterface[] = [];
  titles: ProfileSinglesFinalsInterface[] = [];
  matchesPlayed: OldDrawMatchInterface[] = [];
  summary: ProfileSurfaceSummaryInterface[] = [];
  @Input() type: string | undefined

  constructor(private profileService: ProfileService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.statistics = undefined;
      this.profile = undefined;
      this.breakdown = undefined;

      this.finals = [];
      this.titles = [];
      this.matchesPlayed = [];
      this.summary = [];
      this.getProfileInformation('atp', params['name'])
    })
  }

  getProfileInformation(type: string, name: string) {
    this.profileInfoIsLoad = false;
    this.profileStatsIsLoad = false;
    this.profileLoadError = false;

    this.profileService.getInformation(name).subscribe(res => {
      this.profile = res;
      this.profileInfoIsLoad = true;
      this.profileLoadError = false;
    }, () => {
      this.profileInfoIsLoad = true;
      this.profileLoadError = true;
    })

    this.profileService.getStatistics(name).subscribe(res => {
      this.statistics = res;
      this.profileStatsIsLoad = false;
      this.profileLoadError = false;
    }, () => {
      this.profileStatsIsLoad = true;
      this.profileLoadError = true;
    })
  }
}
