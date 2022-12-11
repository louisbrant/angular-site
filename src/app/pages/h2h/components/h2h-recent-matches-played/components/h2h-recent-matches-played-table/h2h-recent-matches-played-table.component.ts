import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-h2h-recent-matches-played-table',
  templateUrl: './h2h-recent-matches-played-table.component.html',
  styleUrls: ['./h2h-recent-matches-played-table.component.scss']
})
export class H2hRecentMatchesPlayedTableComponent implements OnInit {
  @Input() matches:any;

  constructor() {
  }

  ngOnInit(): void {

  }

}
