import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { OldSelectorComponent } from "src/app/shared/components/old-selector/old-selector.component";
import { DrawChampionComponent } from "./components/draw-champion/draw-champion.component";
import { MatchStatComponent } from "./components/match-stat/match-stat.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { SearchInputHeaderComponent } from "./components/search-input-header/search-input-header.component";
import { ShortTableComponent } from "./components/short-table/short-table.component";
import { SportsmanComponent } from "./components/sportsman/sportsman.component";
import { MoneyPipe } from "./pipes/money.pipe";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { TabComponent } from './components/tab/tab.component';
import { ArrowTabComponent } from './components/arrow-tab/arrow-tab.component';
import { CountryFlagComponent } from './components/country-flag/country-flag.component';
import { ShortRoundPipe } from "./pipes/short-round.pipe";
import { CoefComponent } from "./components/coef/coef.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TournamentInfoComponent } from "./components/tournament-info/tournament-info.component";
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    DrawChampionComponent,
    MatchStatComponent,
    MatchStatComponent,
    SearchInputComponent,
    SearchInputHeaderComponent,
    ShortTableComponent,
    SportsmanComponent,
    MoneyPipe,
    ShortRoundPipe,
    OldSelectorComponent,
    TabComponent,
    ArrowTabComponent,
    CountryFlagComponent,
    CoefComponent,
    TournamentInfoComponent,
    SidebarComponent,
    YearPickerComponent,
    YearPickerComponent,
    SelectorComponent,
    SearchComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    ClickOutsideModule
  ],
  exports: [
    DrawChampionComponent,
    MatchStatComponent,
    MatchStatComponent,
    SearchInputComponent,
    SearchInputHeaderComponent,
    ShortTableComponent,
    SportsmanComponent,
    MoneyPipe,
    ShortRoundPipe,
    OldSelectorComponent,
    SelectorComponent,
    TabComponent,
    ArrowTabComponent,
    CountryFlagComponent,
    CoefComponent,
    TournamentInfoComponent,
    SidebarComponent,
    YearPickerComponent,
    SearchComponent,
  ]
})
export class SharedModule {
}
