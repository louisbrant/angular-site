import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {H2hComponent} from "./h2h.component";
import {SharedModule} from "../../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {H2hInformationComponent} from "./components/h2h-information/h2h-information.component";
import {H2hInformationTableComponent} from "./components/h2h-information-table/h2h-information-table.component";
import {H2hPredictionsComponent} from "./components/h2h-predictions/h2h-predictions.component";
import {H2hEventStatsComponent} from "./components/h2h-event-stats/h2h-event-stats.component";
import {H2hRecentMatchesPlayedComponent} from "./components/h2h-recent-matches-played/h2h-recent-matches-played.component";
import {H2hRecentMatchesPlayedTableComponent} from "./components/h2h-recent-matches-played/components/h2h-recent-matches-played-table/h2h-recent-matches-played-table.component";
import {H2hUpcomingMatchesComponent} from "./components/h2h-upcoming-matches/h2h-upcoming-matches.component";
import {H2hPlayersStatsComponent} from "./components/h2h-players-stats/h2h-players-stats.component";
import {H2hBreakdownOpponentsComponent} from "./components/h2h-breakdown-opponents/h2h-breakdown-opponents.component";
import {H2hMatchesPlayedComponent} from "./components/h2h-matches-played/h2h-matches-played.component";
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [
    H2hComponent,
    H2hInformationComponent,
    H2hInformationTableComponent,
    H2hUpcomingMatchesComponent,
    H2hPredictionsComponent,
    H2hEventStatsComponent,
    H2hPlayersStatsComponent,
    H2hMatchesPlayedComponent,
    H2hBreakdownOpponentsComponent,
    H2hRecentMatchesPlayedComponent,
    H2hRecentMatchesPlayedTableComponent,

  ],
    imports: [
        SharedModule,
        BrowserModule,
        CommonModule,
        ProfileModule,
        RouterModule,
    ],
  exports: [
    H2hComponent,
    H2hInformationComponent,
    H2hInformationTableComponent,
    H2hUpcomingMatchesComponent,
    H2hPredictionsComponent,
    H2hEventStatsComponent,
  ]
})
export class H2hModule {
}
