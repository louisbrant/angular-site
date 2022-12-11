import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {CalendarComponent} from "./calendar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CalendarTableComponent} from "./components/calendar-table/calendar-table.component";

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarTableComponent,
  ],
    imports: [
        SharedModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
    ],
  providers: [],
  exports: [
  ]
})
export class CalendarModule {
}
