import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ProfileMatchesPlayedComponent } from "src/app/pages/profile/components/profile-matches-played/profile-matches-played.component";
import { ProfileStatsComponent } from "./components/profile-stats/profile-stats.component";
import { ProfileMatchStatsComponent } from "./components/profile-match-stats/profile-match-stats.component";
import { ProfileGameStatComponent } from "./components/profile-stats/components/profile-game-stat/profile-game-stat.component";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileMatchStatsTablesComponent } from "./components/profile-match-stats/components/profile-match-stats-tables/profile-match-stats-tables.component";
import { ProfilePerformanceBreakdownComponent } from "./components/profile-performance-breakdown/profile-performance-breakdown.component";
import { BrowserModule } from "@angular/platform-browser";
import { ProfileInformationComponent } from "./components/profile-stats/components/profile-game-stat/profile-information/profile-information.component";
import { ProfileH2HWithComponent } from "./components/profile-h2h-with/profile-h2hwith.component";
import { SharedModule } from "../../shared/shared.module";
import { ProfileMatchStatsH2hComponent } from "src/app/pages/profile/components/profile-match-stats/components/profile-match-stats-history/profile-match-stats-h2h.component";
import { ProfileMatchStatsSummaryComponent } from "./components/profile-match-stats/components/profile-match-stats-summary/profile-match-stats-summary.component";
import { ProfilePerformanceYearPickerComponent } from "./components/profile-performance-breakdown/components/profile-performance-year-picker/profile-performance-year-picker.component";
import { ProfileUpcomingMatchesComponent } from "./components/profile-upcoming-matches/profile-upcoming-matches.component";
import { ProfileSingleTitlesFinalsComponent } from "./components/profile-single-titles-finals/profile-single-titles-finals.component";
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    ProfileStatsComponent,
    ProfileUpcomingMatchesComponent,
    ProfileGameStatComponent,
    ProfileInformationComponent,
    ProfilePerformanceYearPickerComponent,
    ProfileMatchStatsTablesComponent,
    ProfileMatchStatsH2hComponent,
    ProfileMatchStatsSummaryComponent,
    ProfilePerformanceBreakdownComponent,
    ProfileMatchStatsComponent,
    ProfileSingleTitlesFinalsComponent,
    ProfileMatchesPlayedComponent,
    ProfileComponent,
    ProfileH2HWithComponent,
  ],
  exports: [
    ProfileMatchesPlayedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    ClickOutsideModule,
  ]
})
export class ProfileModule {
}
