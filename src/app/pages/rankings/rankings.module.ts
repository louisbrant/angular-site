import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule, DatePipe} from "@angular/common";
import {RankingsComponent} from "./rankings.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    RankingsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe]
})
export class RankingsModule {
}
