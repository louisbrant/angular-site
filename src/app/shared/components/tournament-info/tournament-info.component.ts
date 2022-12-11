import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[tournamentInfo]',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss']
})
export class TournamentInfoComponent implements OnInit {
  @Input() tournamentName: string = '';
  @Input() court: string = '';
  @Input() country: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
