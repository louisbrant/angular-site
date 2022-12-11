import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';
import { FilterInterface } from 'src/app/shared/interfaces/filter';
import { RoundInterface } from 'src/app/shared/interfaces/round';
import { H2HService } from '../../h2h.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-h2h-breakdown-opponents',
  templateUrl: './h2h-breakdown-opponents.component.html',
  styleUrls: ['./h2h-breakdown-opponents.component.scss'],
})
export class H2hBreakdownOpponentsComponent implements OnInit {
  playerOne = '';
  playerTwo = '';
  type: string = 'atp';
  PlOneStat: any;
  PlTwoStat: any;
  filtersFormGroup = new FormGroup({});

  surfaceFilters: FilterInterface[] = [{ name: 'All Surfaces', value: '' }];

  roundFilters: FilterInterface[] = [{ name: 'All Rounds', value: '' }];

  careerFilters: FilterInterface[] = [{ name: 'Career', value: '' }];

  tournamentFilters: FilterInterface[] = [
    { name: 'All Tournaments', value: '' },
  ];

  headers: any;
  playerEventStats: any;
  career: string = 'YTD W/L';
  court: string = '';
  round: string = '';
  tournament: string = '';

  public subs: Subscription = new Subscription();

  constructor(
    private h2hService: H2HService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playerOne = params['playerOne'];
      this.playerTwo = params['playerTwo'];
      this.type = params['type'];
      this.getFilters(this.playerOne, this.playerTwo);
    });
  }

  private getFilters(playerName1: string, playerName2: string) {
    this.h2hService
      .getFilters(playerName1, playerName2)
      .subscribe((filters: any) => {
        const surfaceFiltersTemp: FilterInterface[] = [
          { name: 'All Surfaces', value: '' },
        ];
        for (let court of filters.courts) {
          let courtValues = [court.name];
          if (court.id == 4 || court.id == 10 || court.id == 6) continue;
          if (court.id == 3) {
            courtValues.push('Carpet');
            courtValues.push('Acrylic');
          }
          surfaceFiltersTemp.push({
            name: court.name,
            value: courtValues.join(','),
          });
        }
        this.surfaceFilters = surfaceFiltersTemp;

        this.roundFilters = [
          { name: 'All Rounds', value: '' },
          ...filters.rounds.map((round: RoundInterface) => ({
            name: round.name,
            value: round.name,
          })),
        ];

        this.careerFilters = [
          { name: 'Career', value: '' },
          ...filters.years.map((year: any) => ({ name: year, value: year })),
        ];
        this.tournamentFilters = [
          { name: 'All Tournaments', value: '' },
          ...filters.tournaments.map((tournament: any) => ({
            name: tournament.name,
            value: tournament.name,
            additionalInformation: tournament.date,
          })),
        ];

        this.filtersFormGroup = new FormGroup({
          career: new FormControl(this.careerFilters[0].value),
          court: new FormControl(this.surfaceFilters[0].value),
          round: new FormControl(this.roundFilters[0].value),
          tournament: new FormControl(this.tournamentFilters[0].value),
        });
        this.fetchH2hBreakdown(this.filtersFormGroup.value);
        this.filtersFormGroup.valueChanges
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((changes) => {
            this.playerEventStats = [];
            this.fetchH2hBreakdown(changes);
          });
      });
  }

  private fetchH2hBreakdown(changes: any) {
    forkJoin({
      firstPlayer: this.h2hService.getBreakDownStats(
        this.type,
        this.playerOne,
        changes
      ),
      secondPlayer: this.h2hService.getBreakDownStats(
        this.type,
        this.playerTwo,
        changes
      ),
    }).subscribe(({ firstPlayer, secondPlayer }) => {
      this.PlOneStat = firstPlayer;
      this.PlTwoStat = secondPlayer;
      console.log('pl1s', firstPlayer, 'pl2s', secondPlayer);

      if (this.PlOneStat && this.PlTwoStat) {
        this.headers = [
          { name: 'stats', value: 'Stats' },
          { name: 'firstPlayer', value: this.PlOneStat.name },
          { name: 'secondPlayer', value: this.PlTwoStat.name },
        ];

        let eventStats = [
          {
            stats: this.career,
            firstPlayer: `${this.PlOneStat.ytdWon}/${this.PlOneStat.ytdLost}`,
            secondPlayer: `${this.PlTwoStat.ytdWon}/${this.PlTwoStat.ytdLost}`,
          },
          {
            stats: 'Sets W/L',
            firstPlayer: `${this.PlOneStat.setsWon1}/${this.PlOneStat.setsWon2}`,
            secondPlayer: `${this.PlTwoStat.setsWon1}/${this.PlTwoStat.setsWon2}`,
          },
          {
            stats: 'Games W/L',
            firstPlayer: `${this.PlOneStat.gamesWon1}/${this.PlOneStat.gamesWon2}`,
            secondPlayer: `${this.PlTwoStat.gamesWon1}/${this.PlTwoStat.gamesWon2}`,
          },
          {
            stats: 'Hard W/L',
            firstPlayer: `${this.PlOneStat.hard1}/${this.PlOneStat.hard2}`,
            secondPlayer: `${this.PlTwoStat.hard1}/${this.PlTwoStat.hard2}`,
          },
          {
            stats: 'Clay W/L',
            firstPlayer: `${this.PlOneStat.clay1}/${this.PlOneStat.clay2}`,
            secondPlayer: `${this.PlTwoStat.clay1}/${this.PlTwoStat.clay2}`,
          },
          {
            stats: 'Indoor Hard W/L',
            firstPlayer: `${this.PlOneStat.iHard1}/${this.PlOneStat.iHard2}`,
            secondPlayer: `${this.PlTwoStat.iHard1}/${this.PlTwoStat.iHard2}`,
          },
          {
            stats: 'Grass W/L',
            firstPlayer: `${this.PlOneStat.grass1}/${this.PlOneStat.grass2}`,
            secondPlayer: `${this.PlTwoStat.grass1}/${this.PlTwoStat.grass2}`,
          },
          {
            stats: 'Aces Per Game',
            firstPlayer: this.PlOneStat.aces,
            secondPlayer: this.PlTwoStat.aces,
          },
          {
            stats: 'Total Aces',
            firstPlayer: this.PlOneStat.acesTotal,
            secondPlayer: this.PlTwoStat.acesTotal,
          },
          {
            stats: 'Double Faults Per Game',
            firstPlayer: this.PlOneStat.doubleFaultsCount,
            secondPlayer: this.PlTwoStat.doubleFaultsCount,
          },
          {
            stats: 'Total Double Faults',
            firstPlayer: this.PlOneStat.totalDoubleFaultsCount,
            secondPlayer: this.PlTwoStat.totalDoubleFaultsCount,
          },
          {
            stats: 'Avg Match Time',
            firstPlayer: this.PlOneStat.avgTime1,
            secondPlayer: this.PlTwoStat.avgTime2,
          },
          {
            stats: 'Avg Opp Rank',
            firstPlayer: this.PlOneStat.avgOppRank,
            secondPlayer: this.PlTwoStat.avgOppRank,
          },
          {
            stats: '1st Serve %',
            firstPlayer: `${this.PlOneStat.firstServePercentage}% (${this.PlOneStat.firstServe}/${this.PlOneStat.firstServeOf})`,
            secondPlayer: `${this.PlTwoStat.firstServePercentage}% (${this.PlTwoStat.firstServe}/${this.PlTwoStat.firstServeOf})`,
          },
          {
            stats: '1st Serve W %',
            firstPlayer: `${this.PlOneStat.winningOnFirstServePercentage}% (${this.PlOneStat.winningOnFirstServe}/${this.PlOneStat.winningOnFirstServeOf})`,
            secondPlayer: `${this.PlTwoStat.winningOnFirstServePercentage}% (${this.PlTwoStat.winningOnFirstServe}/${this.PlTwoStat.winningOnFirstServeOf})`,
          },
          {
            stats: '2nd Serve W %',
            firstPlayer: `${this.PlOneStat.winningOnSecondServePercentage}% (${this.PlOneStat.winningOnSecondServe}/${this.PlOneStat.winningOnSecondServeOf})`,
            secondPlayer: `${this.PlTwoStat.winningOnSecondServePercentage}% (${this.PlTwoStat.winningOnSecondServe}/${this.PlTwoStat.winningOnSecondServeOf})`,
          },
          {
            stats: 'Total BPs Won %',
            firstPlayer: `${this.PlOneStat.breakpointsWonPercentage}% (${this.PlOneStat.breakPointsConverted}/${this.PlOneStat.breakPointsConvertedOf})`,
            secondPlayer: `${this.PlTwoStat.breakpointsWonPercentage}% (${this.PlTwoStat.breakPointsConverted}/${this.PlTwoStat.breakPointsConvertedOf})`,
          },

          {
            stats: 'Return Pts Won %',
            firstPlayer: `${this.PlOneStat.returnPtsWinPercentage}% (${this.PlOneStat.returnPtsWin}/${this.PlOneStat.returnPtsWinOf})`,
            secondPlayer: `${this.PlTwoStat.returnPtsWinPercentage}% (${this.PlTwoStat.returnPtsWin}/${this.PlTwoStat.returnPtsWinOf})`,
          },
          {
            stats: 'Slam Matches',
            firstPlayer: `${this.PlOneStat.slam1}/${this.PlOneStat.slam2}`,
            secondPlayer: `${this.PlTwoStat.slam1}/${this.PlTwoStat.slam2}`,
          },
          {
            stats: 'Masters Matches',
            firstPlayer: `${this.PlOneStat.master1}/${this.PlOneStat.master2}`,
            secondPlayer: `${this.PlTwoStat.master1}/${this.PlTwoStat.master2}`,
          },
          {
            stats: 'Cups Matches',
            firstPlayer: `${this.PlOneStat.cup1}/${this.PlOneStat.cup2}`,
            secondPlayer: `${this.PlTwoStat.cup1}/${this.PlTwoStat.cup2}`,
          },
          {
            stats: 'Main Tour Matches',
            firstPlayer: `${this.PlOneStat.main1}/${this.PlOneStat.main2}`,
            secondPlayer: `${this.PlTwoStat.main1}/${this.PlTwoStat.main2}`,
          },
          {
            stats: 'Tour Finals Matches',
            firstPlayer: `${this.PlOneStat.tourFinals1}/${this.PlOneStat.tourFinals2}`,
            secondPlayer: `${this.PlTwoStat.tourFinals1}/${this.PlTwoStat.tourFinals2}`,
          },
          {
            stats: 'Challenger Matches',
            firstPlayer: `${this.PlOneStat.challengers1}/${this.PlOneStat.challengers2}`,
            secondPlayer: `${this.PlTwoStat.challengers1}/${this.PlTwoStat.challengers2}`,
          },
          {
            stats: 'Futures Matches',
            firstPlayer: `${this.PlOneStat.future1}/${this.PlOneStat.future2}`,
            secondPlayer: `${this.PlTwoStat.future1}/${this.PlTwoStat.future2}`,
          },
          {
            stats: 'Best of 3 Sets W %',
            firstPlayer: `${this.PlOneStat.bestOfThreeWonPercentage}% (${this.PlOneStat.bestOfThreeWon}/ ${this.PlOneStat.bestOfThreeCount})`,
            secondPlayer: `${this.PlTwoStat.bestOfThreeWonPercentage}% (${this.PlTwoStat.bestOfThreeWon}/ ${this.PlTwoStat.bestOfThreeCount})`,
          },
          {
            stats: 'Best of 5 Sets W %',
            firstPlayer: `${this.PlOneStat.bestOfFiveWonPercentage}% (${this.PlOneStat.bestOfFiveWon}/ ${this.PlOneStat.bestOfFiveCount})`,
            secondPlayer: `${this.PlTwoStat.bestOfFiveWonPercentage}% (${this.PlTwoStat.bestOfFiveWon}/ ${this.PlTwoStat.bestOfFiveCount})`,
          },
          {
            stats: 'Total TBs W %',
            firstPlayer: `${this.PlOneStat.totalTBWinPercentage}% (${this.PlOneStat.tiebreakWon}/ ${this.PlOneStat.tiebreakCount})`,
            secondPlayer: `${this.PlTwoStat.totalTBWinPercentage}% (${this.PlTwoStat.tiebreakWon}/ ${this.PlTwoStat.tiebreakCount})`,
          },
          {
            stats: 'Deciding Set W %',
            firstPlayer: `${this.PlOneStat.decidingSetWinPercentage}% (${this.PlOneStat.decidingSetWin}/ ${this.PlOneStat.decidingSetCount})`,
            secondPlayer: `${this.PlTwoStat.decidingSetWinPercentage}% (${this.PlTwoStat.decidingSetWin}/ ${this.PlTwoStat.decidingSetCount})`,
          },
          {
            stats: '1st Set W, W Match',
            firstPlayer: `${this.PlOneStat.firstSetWinMatchWinPercentage}% (${this.PlOneStat.firstSetWinCount}/ ${this.PlOneStat.firstSetWinMatchWin})`,
            secondPlayer: `${this.PlTwoStat.firstSetWinMatchWinPercentage}% (${this.PlTwoStat.firstSetWinCount} / ${this.PlTwoStat.firstSetWinMatchWin})`,
          },
          {
            stats: '1st Set W, L Match',
            firstPlayer: `${this.PlOneStat.firstSetWinMatchLosePercentage}% (${this.PlOneStat.firstSetWinCount} / ${this.PlOneStat.firstSetWinMatchLose})`,
            secondPlayer: `${this.PlTwoStat.firstSetWinMatchLosePercentage}% (${this.PlTwoStat.firstSetWinCount} / ${this.PlTwoStat.firstSetWinMatchLose})`,
          },
          {
            stats: '1st Set L, W Match',
            firstPlayer: `${this.PlOneStat.firstSetLoseMatchWinPercentage}% (${this.PlOneStat.firstSetLoseCount}/ ${this.PlOneStat.firstSetLoseMatchWin})`,
            secondPlayer: `${this.PlTwoStat.firstSetLoseMatchWinPercentage}% (${this.PlTwoStat.firstSetLoseCount}/ ${this.PlTwoStat.firstSetLoseMatchWin})`,
          },
        ];

        if (this.court != '' || this.round != '' || this.tournament != '') {
          this.playerEventStats = eventStats.filter((el: any) => {
            return (
              el.stats != 'Hard W/L' &&
              el.stats != 'Clay W/L' &&
              el.stats != 'Grass W/L' &&
              el.stats != 'Indoor Hard W/L' &&
              el.stats != 'Slam Matches' &&
              el.stats != 'Main Tour Matches' &&
              el.stats != 'Masters Matches' &&
              el.stats != 'Tour Finals Matches' &&
              el.stats != 'Cups Matches' &&
              el.stats != 'Challenger Matches' &&
              el.stats != 'Futures Matches'
            );
          });
        } else {
          this.playerEventStats = eventStats;
        }
      }
    });
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl;
  }

  changeCareer(event: any) {
    let currentYear = new Date().getFullYear();
    if (event == currentYear) {
      this.career = 'YTD W/L';
    } else if (event == '') {
      this.career = 'Career W/L';
    } else {
      this.career = 'W/L';
    }
  }

  changeCourt(event: string) {
    this.court = event;
  }

  changeRound(event: string) {
    this.round = event;
  }

  changeTournament(event: string) {
    this.tournament = event;
  }
}
