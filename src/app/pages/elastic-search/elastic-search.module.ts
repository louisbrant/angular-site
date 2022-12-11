import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ElasticSearchComponent} from "src/app/pages/elastic-search/elastic-search.component";
import {ElasticSearchService} from "src/app/pages/elastic-search/elastic-search.service";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    ElasticSearchComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [ElasticSearchService],
  exports: []
})
export class ElasticSearchModule {
}
