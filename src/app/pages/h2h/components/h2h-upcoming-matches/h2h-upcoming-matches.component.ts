import {Component, Input, OnInit} from '@angular/core';

interface H2hUpcomingMatchMockInterface {
  round: string;
  tournament: string;
  court: string;
  firstPlayerScore: number;
  secondPlayerScore: number;
}

@Component({
  selector: 'app-h2h-upcoming-matches',
  templateUrl: './h2h-upcoming-matches.component.html',
  styleUrls: ['./h2h-upcoming-matches.component.scss']
})
export class H2hUpcomingMatchesComponent implements OnInit {

  @Input() firstPlayerName = 'Rafael Nadal'
  @Input() secondPlayerName = 'Roger Federer'
  @Input() match: any;
  upcomingMatches: H2hUpcomingMatchMockInterface[] = [
    {round: 'F', tournament: 'Wimbledon', court: 'Grass', firstPlayerScore: 1.11, secondPlayerScore: 3.60}
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

}
