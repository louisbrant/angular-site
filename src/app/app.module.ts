import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ElasticSearchModule } from "src/app/pages/elastic-search/elastic-search.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "./pages/profile/profile.module";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { H2hModule } from "./pages/h2h/h2h.module";
import { TournamentModule } from "./pages/tournament/tournament.module";
import { CalendarModule } from "./pages/calendar/calendar.module";
import { RankingsModule } from "./pages/rankings/rankings.module";
import { TempComponent } from './temp/temp.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { HomeModule } from "./pages/home/home.module";
import { MatchesModule } from "./pages/matches/matches.module";
import { H2hListModule } from "./pages/h2h-list/h2h-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    TempComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ProfileModule,
    SharedModule,
    ReactiveFormsModule,
    H2hModule,
    TournamentModule,
    CalendarModule,
    RankingsModule,
    ElasticSearchModule,
    ClickOutsideModule,
    HomeModule,
    MatchesModule,
    H2hListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
