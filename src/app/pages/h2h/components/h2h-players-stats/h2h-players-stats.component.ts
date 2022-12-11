import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {skip} from "rxjs/operators";
import {ProfileService} from 'src/app/pages/profile/services/profile.service';
import {FilterInterface} from "src/app/shared/interfaces/filter";
import {H2HService} from '../../h2h.service';

@Component({
  selector: 'app-h2h-players-stats',
  templateUrl: './h2h-players-stats.component.html',
  styleUrls: ['./h2h-players-stats.component.scss']
})
export class H2hPlayersStatsComponent implements OnInit {

  private subs = new Subscription();

  playerOne = '';
  playerTwo = '';
  type: string = 'atp';
  h2hStats: any;
  headers: any;
  playerEventStats: any;
  errorMessage?: string;
  filtersFormGroup = new FormGroup({});
  roundFilters: FilterInterface[] = [
    {name: 'All Rounds', value: ''}
  ]

  levelFilters: FilterInterface[] = [
    {name: 'All Levels', value: ''}
  ]

  surfaceFilters: FilterInterface[] = [
    {name: 'All Surfaces', value: ''}
  ]

  tournamentFilters: FilterInterface[] = [
    {name: 'All Tournaments', value: ''}
  ]

  constructor(private h2hService: H2HService, private profileService: ProfileService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.playerOne = params['playerOne']
      this.playerTwo = params['playerTwo']
      this.type = params['type']
      this.getFilters(this.playerOne, this.playerTwo, this.type)
    })
  }

  private getFilters(playerName1: string, playerName2: string, type: string) {
    this.h2hService.getFiltersVs(playerName1, playerName2, type).subscribe((filters: any) => {

      const surfaceFiltersTemp: FilterInterface[] = [{name: 'All Surfaces', value: ''}]
      for (let court of filters.courts) {
        let courtValues = [court.name]
        if (court.id == 4 || court.id == 10 || court.id == 6) continue
        if (court.id == 3) {
          courtValues.push('Carpet');
          courtValues.push('Acrylic');
        }
        surfaceFiltersTemp.push({name: court.name, value: courtValues.join(',')})
      }
      this.surfaceFilters = surfaceFiltersTemp;

      this.roundFilters = [
        {name: 'All Rounds', value: ''},
        ...filters.rounds
          .map((round: any) => ({name: round.name, value: round.name}))
      ]

      this.levelFilters = [
        {name: 'All Levels', value: ''},
        ...filters.level
          .map((level: any) => ({name: level.name, value: level.id}))
      ]

      this.tournamentFilters = [
        {name: 'All Tournaments', value: ''},
        ...filters.tournaments.map((tournament: any) => ({
          name: tournament.name,
          value: tournament.name,
          additionalInformation: tournament.date
        }))
      ]

      this.filtersFormGroup = new FormGroup({
        level: new FormControl(this.levelFilters[0].value),
        court: new FormControl(this.surfaceFilters[0].value),
        round: new FormControl(this.roundFilters[0].value),
        tournament: new FormControl(this.tournamentFilters[0].value),
      })
      this.fetchH2hStats(this.filtersFormGroup.value);
      this.subs.unsubscribe()
      this.subs = new Subscription();
      this.subs.add(this.filtersFormGroup.valueChanges.subscribe(changes => {
        this.playerEventStats = [];
        this.fetchH2hStats(changes);
      }));


    })
  }

  public get playerOneName(): string | null {
    return this.playerOne ? this.playerOne.split(' ')[1] : null;
  }

  public get playerTwoName(): string | null {
    return this.playerTwo ? this.playerTwo.split(' ')[1] : null;
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl || undefined;
  }

  percents(first_serve: number | undefined, first_serve_of: number | undefined) {
    if (typeof(first_serve) == 'number' && typeof(first_serve_of) == 'number') {
      return Math.round((first_serve / first_serve_of) * 100)
    }
    return '*'
  }

  fetchH2hStats(changes: any) {
    this.h2hService.getH2HStats(this.type, this.playerOne, this.playerTwo, changes).subscribe(stats => {
      this.h2hStats = stats;

      if(this.h2hStats){
        this.errorMessage = "";
        const { player1, player2, matchesCount, surfaceData, h2h } = this.h2hStats;

        this.headers = [
          {name: 'stats', value: 'Stats'},
          {name: 'firstPlayer', value: player1.name, styles: {'text-align': 'center'}},
          {name: 'secondPlayer', value: player2.name, styles: {'text-align': 'center'}},
        ]

        this.playerEventStats = [
          {
            stats: 'H2H All Matches',
            firstPlayer: surfaceData.total1,
            secondPlayer: surfaceData.total2
          },
          {
            stats: 'Sets Won',
            firstPlayer: player1.setsWon ,
            secondPlayer: player2.setsWon
          },
          {
            stats: 'Games Won',
            firstPlayer: player1.gamesWon,
            secondPlayer: player2.gamesWon
          },
          {
            stats: 'Total Aces',
            firstPlayer: player1.acesCount,
            secondPlayer: player2.acesCount
          },
          {
            stats: 'Total DFs',
            firstPlayer: player1.doubleFaultsCount,
            secondPlayer: player2.doubleFaultsCount
          },
          {stats: 'Avg Match Time', firstPlayer: player1.avgTime, secondPlayer: player2.avgTime},
          {
            stats: '1st Serve %',
            firstPlayer: `${player1.firstServePercentage}% (${player1.firstServe}/${player1.firstServeOf})`,
            secondPlayer: `${player2.firstServePercentage}% (${player2.firstServe}/${player2.firstServeOf})`
          },
          {
            stats: '1st Serve W %',
            firstPlayer: `${player1.winningOnFirstServePercentage}% (${player1.winningOnFirstServe}/${player1.winningOnFirstServeOf})`,
            secondPlayer: `${player2.winningOnFirstServePercentage}% (${player2.winningOnFirstServe}/${player2.winningOnFirstServeOf})`
          },
          {
            stats: '2nd Serve W %',
            firstPlayer: `${player1.winningOnSecondServePercentage}% (${player1.winningOnSecondServe}/${player1.winningOnSecondServeOf})`,
            secondPlayer: `${player2.winningOnSecondServePercentage}% (${player2.winningOnSecondServe}/${player2.winningOnSecondServeOf})`
          },
          {
            stats: 'Total BPs Won %',
            firstPlayer: `${player1.breakpointsWonPercentage}% (${player1.breakPointsConverted}/${player1.breakPointsConvertedOf})`,
            secondPlayer: `${player2.breakpointsWonPercentage}% (${player2.breakPointsConverted}/${player2.breakPointsConvertedOf})`
          },

          {
            stats: 'Return Pts Won %',
            firstPlayer: `${this.percents(((player2?.winningOnFirstServeOf || 0) - (player2?.winningOnFirstServe || 0)) + (((player2?.winningOnSecondServeOf || 0) - (player2?.winningOnSecondServe || 0))), (player2?.winningOnFirstServeOf || 0) + (player2?.winningOnSecondServeOf || 0))}% (${((player2?.winningOnFirstServeOf || 0) - (player2?.winningOnFirstServe || 0)) + (((player2?.winningOnSecondServeOf || 0) - (player2?.winningOnSecondServe || 0)))} / ${(player2?.winningOnFirstServeOf || 0) + (player2?.winningOnSecondServeOf || 0)})`,
            secondPlayer: `${this.percents(((player1?.winningOnFirstServeOf || 0) - (player1?.winningOnFirstServe || 0)) + (((player1?.winningOnSecondServeOf || 0) - (player1?.winningOnSecondServe || 0))), (player1?.winningOnFirstServeOf || 0) + (player1?.winningOnSecondServeOf || 0))}% (${((player1?.winningOnFirstServeOf || 0) - (player1?.winningOnFirstServe || 0)) + (((player1?.winningOnSecondServeOf || 0) - (player1?.winningOnSecondServe || 0)))} / ${(player1?.winningOnFirstServeOf || 0) + (player1?.winningOnSecondServeOf || 0)})`
          },
          {
            stats: 'Best of 3 Sets W %',
            firstPlayer: `${player1.bestOfThreeWonPercentage}% (${player1.bestOfThreeWon}/ ${player1.bestOfThreeCount})`,
            secondPlayer: `${player2.bestOfThreeWonPercentage}% (${player2.bestOfThreeWon}/ ${player2.bestOfThreeCount})`
          },
          {
            stats: 'Best of 5 Sets W %',
            firstPlayer: `${player1.bestOfFiveWonPercentage}% (${player1.bestOfFiveWon}/ ${player1.bestOfFiveCount})`,
            secondPlayer: `${player2.bestOfFiveWonPercentage}% (${player2.bestOfFiveWon}/ ${player2.bestOfFiveCount})`
          },
          {stats: 'Total TBs W %',
            firstPlayer: `${player1.totalTBWinPercentage}% (${player1.tiebreakWon}/ ${player1.tiebreakCount})`,
            secondPlayer: `${player2.totalTBWinPercentage}% (${player2.tiebreakWon}/ ${player2.tiebreakCount})`
          },
          {
            stats: 'Deciding Set W %',
            firstPlayer: `${player1.decidingSetWinPercentage}% (${player1.decidingSetWin}/ ${player1.decidingSetCount})`,
            secondPlayer: `${player2.decidingSetWinPercentage}% (${player2.decidingSetWin}/ ${player2.decidingSetCount})`
          },
          {
            stats: '1st Set W, W Match',
            firstPlayer: `${player1.firstSetWinMatchWinPercentage}% (${player1.firstSetWinMatchWin}/ ${player1.firstSetWinCount})`,
            secondPlayer: `${player2.firstSetWinMatchWinPercentage}% (${player2.firstSetWinMatchWin}/${player2.firstSetWinCount})`
          },
          {
            stats: '1st Set W, L Match',
            firstPlayer: `${player1.firstSetWinMatchLosePercentage}% (${player1.firstSetWinCount} / ${player1.firstSetWinMatchLose})`,
            secondPlayer: `${player2.firstSetWinMatchLosePercentage}% (${player2.firstSetWinCount}/ ${player2.firstSetWinMatchLose})`
          },
          {
            stats: '1st Set L, W Match',
            firstPlayer: `${player1.firstSetLoseMatchWinPercentage}% (${player1.firstSetLoseCount} / ${player1.firstSetLoseMatchWin})`,
            secondPlayer: `${player2.firstSetLoseMatchWinPercentage}% (${player2.firstSetLoseCount} / ${player2.firstSetLoseMatchWin})`
          },
        ]
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}
