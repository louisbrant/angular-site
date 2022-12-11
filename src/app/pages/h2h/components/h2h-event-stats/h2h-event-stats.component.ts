import { Component, Input, OnInit } from '@angular/core';
import { TableHeaderInterface } from "src/app/shared/interfaces/table";

@Component({
  selector: 'app-h2h-event-stats',
  templateUrl: './h2h-event-stats.component.html',
  styleUrls: ['./h2h-event-stats.component.scss']
})
export class H2hEventStatsComponent implements OnInit {
  @Input() player1: any;
  @Input() player2: any;
  court: string = 'grass';
  tournament: string = 'Wimbledon';
  country: string = 'ALB';

  headers: TableHeaderInterface[] = [
    { name: 'stats', value: 'Stats' },
    { name: 'firstPlayer', value: 'Federer' },
    { name: 'secondPlayer', value: 'Nadal' },
  ];
  playerEventStats: any;

  constructor() { }

  ngOnInit(): void {
    if (this.player1 && this.player2) {
      this.tournament = this.player1.tourName
      this.court = this.player1.court
      this.country = this.player1.country
      this.headers[1].value = this.player1.name;
      this.headers[2].value = this.player2.name;

      this.playerEventStats = [
        {
          stats: 'Matches Played',
          firstPlayer: this.player1.matchesPlayed,
          secondPlayer: this.player2.matchesPlayed
        },
        { stats: 'Last Match Time', firstPlayer: this.player1.lastMatchTime, secondPlayer: this.player2.lastMatchTime },
        { stats: 'Total Time', firstPlayer: this.player1.totalTime, secondPlayer: this.player2.totalTime },
        {
          stats: 'Aces Per Game',
          firstPlayer: this.player1.aces,
          secondPlayer: this.player2.aces
        },
        {
          stats: 'Total Aces',
          firstPlayer: this.player1.acesTotal,
          secondPlayer: this.player2.acesTotal,
        },
        {
          stats: 'Double Faults Per Game',
          firstPlayer: this.player1.doubleFaultsCount,
          secondPlayer: this.player2.doubleFaultsCount
        },
        {
          stats: 'Total Double Faults',
          firstPlayer: this.player1.totalDoubleFaultsCount,
          secondPlayer: this.player2.totalDoubleFaultsCount,
        },
        {
          stats: '1st Serve %',
          firstPlayer: `${this.player1.firstServePercentage}% (${this.player1.firstServe}/${this.player1.firstServeOf})`,
          secondPlayer: `${this.player2.firstServePercentage}% (${this.player2.firstServe}/${this.player2.firstServeOf})`
        },
        {
          stats: '1st Serve W %',
          firstPlayer: `${this.player1.winningOnFirstServePercentage}% (${this.player1.winningOnFirstServe}/${this.player1.winningOnFirstServeOf})`,
          secondPlayer: `${this.player2.winningOnFirstServePercentage}% (${this.player2.winningOnFirstServe}/${this.player2.winningOnFirstServeOf})`
        },
        {
          stats: '2nd Serve W %',
          firstPlayer: `${this.player1.winningOnSecondServePercentage}% (${this.player1.winningOnSecondServe}/${this.player1.winningOnSecondServeOf})`,
          secondPlayer: `${this.player2.winningOnSecondServePercentage}% (${this.player2.winningOnSecondServe}/${this.player2.winningOnSecondServeOf})`
        },
        {
          stats: 'Unforced Errors',
          firstPlayer: this.player1.unforcedErrors,
          secondPlayer: this.player2.unforcedErrors
        },
        {
          stats: 'Total BPs Won %',
          firstPlayer: `${this.player1.breakpointsWonPercentage}% (${this.player1.breakPointsConverted}/${this.player1.breakPointsConvertedOf})`,
          secondPlayer: `${this.player2.breakpointsWonPercentage}% (${this.player2.breakPointsConverted}/${this.player2.breakPointsConvertedOf})`
        },
        {
          stats: 'Total BPs Saved',
          firstPlayer: `${this.player1.breakPointsSavedPercentage}% (${this.player1.breakPointsSaved}/${this.player1.breakPointsSavedOf})`,
          secondPlayer: `${this.player2.breakPointsSavedPercentage}% (${this.player2.breakPointsSaved}/${this.player2.breakPointsSavedOf})`,
        },
        {
          stats: 'Service Hold %',
          firstPlayer: `${this.player1.serviceHoldPercentage}% (${this.player1.serviceHold}/${this.player1.serviceHoldOf})`,
          secondPlayer: `${this.player2.serviceHoldPercentage}% (${this.player2.serviceHold}/${this.player2.serviceHoldOf})`,
        },
        {
          stats: 'Opp Hold %',
          firstPlayer: `${this.player1.oppHoldPercentage}% (${this.player1.oppHold}/${this.player1.oppHoldOf})`,
          secondPlayer: `${this.player2.oppHoldPercentage}% (${this.player2.oppHold}/${this.player2.oppHoldOf})`,
        },
        {
          stats: 'Return Pts Won %',
          firstPlayer: `${this.player1.returnPtsWinPercentage}% (${this.player1.returnPtsWin}/${this.player1.returnPtsWinOf})`,
          secondPlayer: `${this.player2.returnPtsWinPercentage}% (${this.player2.returnPtsWin}/${this.player2.returnPtsWinOf})`,
        },
        { stats: 'Fastest Serve', firstPlayer: `${this.player1.fastestServe}mph`, secondPlayer: `${this.player2.fastestServe}mph` },
        { stats: 'Avg 1st Serve', firstPlayer: `${this.player1.averageFirstServeSpeed}mph`, secondPlayer: `${this.player2.averageFirstServeSpeed}mph` },
        { stats: 'Avg 2nd Serve', firstPlayer: `${this.player1.averageSecondServeSpeed}mph`, secondPlayer: `${this.player2.averageSecondServeSpeed}mph` },
        { stats: 'Total Points Won', firstPlayer: this.player1.totalPointsWon, secondPlayer: this.player2.totalPointsWon },
        {
          stats: 'Tiebreak Win %',
          firstPlayer: `${this.player1.decidingSetWinPercentage}% (${this.player1.tiebreakWon}/ ${this.player1.matchesPlayed})`,
          secondPlayer: `${this.player2.decidingSetWinPercentage}% (${this.player2.tiebreakWon}/ ${this.player2.matchesPlayed})`
        },
        { stats: 'Avg Opp Rank', firstPlayer: `${this.player1?.avgOpponentRank?.toFixed(2)}`, secondPlayer: `${this.player2?.avgOpponentRank?.toFixed(2)}` },
        {
          stats: 'Deciding Set W %',
          firstPlayer: `${this.player1.totalTBWinPercentage}% (${this.player1.decidingSetWin}/ ${this.player1.matchesPlayed})`,
          secondPlayer: `${this.player2.totalTBWinPercentage}% (${this.player2.decidingSetWin}/ ${this.player2.matchesPlayed})`
        },
        {
          stats: 'Tiebreaks / Match',
          firstPlayer: `${(this.player1.decidingSetWinPercentage / 100)?.toFixed(2)}`,
          secondPlayer: `${(this.player2.decidingSetWinPercentage / 100)?.toFixed(2)}`
        },
        {
          stats: '1st Set W, W Match',
          firstPlayer: `${this.player1.firstSetWinMatchWinPercentage}% (${this.player1.firstSetWinMatchWin}/ ${this.player1.matchesPlayed})`,
          secondPlayer: `${this.player2.firstSetWinMatchWinPercentage}% (${this.player2.firstSetWinMatchWin}/ ${this.player2.matchesPlayed})`
        },
        {
          stats: '1st Set L, W Match',
          firstPlayer: `${this.player1.firstSetLoseMatchWinPercentage}% (${this.player1.firstSetLoseMatchWin}/ ${this.player1.matchesPlayed})`,
          secondPlayer: `${this.player2.firstSetLoseMatchWinPercentage}% (${this.player2.firstSetLoseMatchWin}/ ${this.player2.matchesPlayed})`
        },
      ]
    }
  }

}
