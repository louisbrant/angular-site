import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { H2hSearchFootballClubsComponent } from './h2h-search-football-clubs/h2h-search-football-clubs.component';
import {SharedModule} from "../../shared/shared.module";
import { H2hSearchTennisAtpComponent } from './h2h-search-tennis-atp/h2h-search-tennis-atp.component';



@NgModule({
  declarations: [
    HomeComponent,
    H2hSearchFootballClubsComponent,
    H2hSearchTennisAtpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
