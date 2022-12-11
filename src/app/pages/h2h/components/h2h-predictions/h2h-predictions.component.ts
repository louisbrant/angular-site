import { Component, OnInit } from '@angular/core';
import {TableHeaderInterface} from "src/app/shared/interfaces/table";

@Component({
  selector: 'app-h2h-predictions',
  templateUrl: './h2h-predictions.component.html',
  styleUrls: ['./h2h-predictions.component.scss']
})
export class H2hPredictionsComponent implements OnInit {
  playerStats = [
    {stat: 'Federer To Win', value: '60%'},
    {stat: 'Nadal To Win', value: '40%'},
    {stat: 'Total Games', value: '20'},
    {stat: 'Total Points', value: '173'},
    {stat: 'Federer To Win 1st Set', value: '58%'},
    {stat: 'Nadal To Win 1st Set', value: '42%'},
    {stat: '2-0 Federer', value: '53%'},
    {stat: '2-0 Nadal', value: '38%'},
    {stat: '2-1 Federer', value: '55%'},
    {stat: '2-1 Nadal', value: '33%'},
  ];
  headers: TableHeaderInterface[] = [
    {name: 'stat'},
    {name: 'value'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
