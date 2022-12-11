import { NgModule } from '@angular/core';
import { MatchesComponent } from './matches.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { H2hMatchesComponent } from './components/player-profile/components/h2h-matches/h2h-matches.component';
import { ProfileMatchesComponent } from './components/player-profile/components/profile-matches/profile-matches.component';
import { ProfileComponent } from './components/player-profile/components/profile/profile.component';
import { UpcomingMatchComponent } from './components/upcoming-match/upcoming-match.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { currentEventStatsComponent } from './components/current-event-stats/current-event-stats.component';
import { VsH2hMatchesComponent } from './components/vs-h2h-matches/vs-h2h-matches.component';
import { VsH2hMatchesOnlyComponent } from './components/vs-h2h-matches-only/vs-h2h-matches-only.component';
import { CareerStatsComponent } from './components/career-stats/career-stats.component';
import { RecentMatchSelectionComponent } from './components/recent-match-selection/recent-match-selection.component';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ClickOutsideModule } from 'ng-click-outside';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    MatchesComponent,
    PlayerProfileComponent,
    ProfileComponent,
    H2hMatchesComponent,
    ProfileMatchesComponent,
    UpcomingMatchComponent,
    PredictionsComponent,
    currentEventStatsComponent,
    VsH2hMatchesComponent,
    VsH2hMatchesOnlyComponent,
    CareerStatsComponent,
    RecentMatchSelectionComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    ClickOutsideModule,
    MatBottomSheetModule
  ],
  exports: [
    PlayerProfileComponent,
  ]
})
export class MatchesModule { }

