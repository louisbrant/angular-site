import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-h2h-information-table',
  templateUrl: './h2h-information-table.component.html',
  styleUrls: ['./h2h-information-table.component.scss']
})
export class H2hInformationTableComponent implements OnInit {
  @Input() playerOne:any;
  @Input() playerTwo:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
