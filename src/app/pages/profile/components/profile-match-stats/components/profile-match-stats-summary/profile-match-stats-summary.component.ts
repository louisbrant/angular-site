import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "src/app/pages/profile/services/profile.service";
import {ProfileSurfaceSummaryInterface} from "../../interfaces/profile-surface-summary";

@Component({
  selector: 'app-profile-match-stats-summary',
  templateUrl: './profile-match-stats-summary.component.html',
  styleUrls: ['./profile-match-stats-summary.component.scss']
})
export class ProfileMatchStatsSummaryComponent implements OnInit {
  summary: ProfileSurfaceSummaryInterface[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.summary = [];
      this.profileService.getSummary(params['name']).subscribe(summary => {
        this.summary = summary
      })
    })
  }

}
