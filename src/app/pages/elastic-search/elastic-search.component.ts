import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ElasticSearchService} from "src/app/pages/elastic-search/elastic-search.service";

@Component({
  selector: 'app-elastic-search',
  templateUrl: './elastic-search.component.html',
  styleUrls: ['./elastic-search.component.scss']
})
export class ElasticSearchComponent implements OnInit, AfterViewInit {

  public elasticSearch: any[] = [];
  params: any;
  searchControl: FormControl = new FormControl('');

  constructor(
    private elasticSearchService: ElasticSearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params?.search) {
        this.search(params.search)
        this.searchControl.patchValue(params.search)
      }
    })
  }

  search($event: any) {
    this.elasticSearchService.getElasticSearch($event).subscribe(result => {
      this.elasticSearch = result
      this.router.navigate([], {
        queryParams: { search: $event },
        queryParamsHandling: 'merge',
      })
    })
  }

  public getYear(date: string) {
    return new Date(date).getFullYear()
  }
}
