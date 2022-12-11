import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import {share, switchMap} from 'rxjs/operators';
import { ProfileStatisticInterface } from '../profile/interfaces/profile';
import { ProfileService } from '../profile/services/profile.service';

import { H2HService } from './h2h.service';

interface IUpcomingMatch {
  date: Date
  odd1: string
  odd2: string
  player1: {name: string, countryAcr: string}
  player2: {name: string, countryAcr: string}
  seed1: null
  seed2: null
  tournament: {name: string, court: {name: string}}
}
@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
  styleUrls: ['./h2h.component.scss'],
})
export class H2hComponent implements OnInit {
  public upcomingMatch$!: Observable<any>;
  public currentStatsPlayerOne: any;
  public currentStatsPlayerTwo: any;
  public profiles$!: Observable<any>;
  statistics1?: ProfileStatisticInterface;
  statistics2?: ProfileStatisticInterface;


  public playerOne!: string;
  public playerTwo!: string;
  public type: string = '';

  constructor(private h2hService: H2HService, private router: Router, private activatedRoute: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.statistics1 = undefined;
      this.statistics2 = undefined;
      this.type = params['type'] || 'atp';
      this.playerOne = params['playerOne'];
      this.playerTwo = params['playerTwo'];
      this.getProfileInformation(params['playerOne'], params['playerTwo']);
      if(this.playerOne && this.playerTwo){

        this.upcomingMatch$ = this.h2hService.getUpcomingMatch(this.type, this.playerOne, this.playerTwo);
        this.profiles$ = this.h2hService.getProfilesData(this.type, this.playerOne, this.playerTwo);
        const changes = {
          career: new Date().getFullYear().toString(),
          court: '',
          round: '',
          tournament: ''
        }

        forkJoin({
          firstPlayer: this.h2hService.getCurrentEventStats(this.type, this.playerOne, this.playerTwo),
          secondPlayer: this.h2hService.getCurrentEventStats(this.type, this.playerTwo, this.playerOne),
        }).subscribe(({firstPlayer, secondPlayer}) => {
          changes.tournament = firstPlayer.tourName;
          this.h2hService.getBreakDownStats(
                this.type,
                this.playerOne,
                changes
            ).pipe(
                  switchMap(res => {
                    this.currentStatsPlayerOne = firstPlayer;
                    this.currentStatsPlayerOne.returnPtsWin = res.returnPtsWin;
                    this.currentStatsPlayerOne.returnPtsWinOf = res.returnPtsWinOf;
                    this.currentStatsPlayerOne.returnPtsWinPercentage = res.returnPtsWinPercentage;
                    this.currentStatsPlayerOne.aces = res.aces;
                    this.currentStatsPlayerOne.acesTotal = res.acesTotal;
                    this.currentStatsPlayerOne.doubleFaultsCount = res.doubleFaultsCount;
                    this.currentStatsPlayerOne.totalDoubleFaultsCount = res.totalDoubleFaultsCount;
                    this.currentStatsPlayerOne.firstServePercentage = res.firstServePercentage;
                    this.currentStatsPlayerOne.firstServe = res.firstServe;
                    this.currentStatsPlayerOne.firstServeOf = res.firstServeOf;
                    this.currentStatsPlayerOne.winningOnFirstServePercentage = res.winningOnFirstServePercentage;
                    this.currentStatsPlayerOne.winningOnFirstServe = res.winningOnFirstServe;
                    this.currentStatsPlayerOne.winningOnFirstServeOf = res.winningOnFirstServeOf;
                    this.currentStatsPlayerOne.winningOnSecondServePercentage = res?.winningOnSecondServePercentage;
                    this.currentStatsPlayerOne.breakpointsWonPercentage = res.breakpointsWonPercentage;
                    this.currentStatsPlayerOne.breakPointsConverted = res.breakPointsConverted;
                    this.currentStatsPlayerOne.breakPointsConvertedOf = res.breakPointsConvertedOf;
                    this.currentStatsPlayerOne.totalTBWinPercentage = res.totalTBWinPercentage;
                    this.currentStatsPlayerOne.decidingSetWin = res.decidingSetWin;
                    this.currentStatsPlayerOne.decidingSetWinPercentage = res.decidingSetWinPercentage;
                    this.currentStatsPlayerOne.firstSetWinMatchWinPercentage = res.firstSetWinMatchWinPercentage;
                    this.currentStatsPlayerOne.firstSetWinMatchWin = res.firstSetWinMatchWin;
                    this.currentStatsPlayerOne.firstSetLoseMatchWinPercentage = res.firstSetLoseMatchWinPercentage;

                    return this.h2hService.getBreakDownStats(
                        this.type,
                        this.playerTwo,
                        changes
                    );
                  }),
              )
              .subscribe(res => {
                this.currentStatsPlayerTwo = secondPlayer;
                this.currentStatsPlayerTwo.returnPtsWin = res.returnPtsWin;
                this.currentStatsPlayerTwo.returnPtsWinOf = res.returnPtsWinOf;
                this.currentStatsPlayerTwo.returnPtsWinPercentage = res.returnPtsWinPercentage;
                this.currentStatsPlayerTwo.aces = res.aces;
                this.currentStatsPlayerTwo.acesTotal = res.acesTotal;
                this.currentStatsPlayerTwo.doubleFaultsCount = res.doubleFaultsCount;
                this.currentStatsPlayerTwo.totalDoubleFaultsCount = res.totalDoubleFaultsCount;
                this.currentStatsPlayerTwo.firstServePercentage = res.firstServePercentage;
                this.currentStatsPlayerTwo.firstServe = res.firstServe;
                this.currentStatsPlayerTwo.firstServeOf = res.firstServeOf;
                this.currentStatsPlayerTwo.winningOnFirstServePercentage = res.winningOnFirstServePercentage;
                this.currentStatsPlayerTwo.winningOnFirstServe = res.winningOnFirstServe;
                this.currentStatsPlayerTwo.winningOnFirstServeOf = res.winningOnFirstServeOf;
                this.currentStatsPlayerTwo.winningOnSecondServePercentage = res.winningOnSecondServePercentage;
                this.currentStatsPlayerTwo.breakpointsWonPercentage = res.breakpointsWonPercentage;
                this.currentStatsPlayerTwo.breakPointsConverted = res.breakPointsConverted;
                this.currentStatsPlayerTwo.breakPointsConvertedOf = res.breakPointsConvertedOf;
                this.currentStatsPlayerTwo.totalTBWinPercentage = res.totalTBWinPercentage;
                this.currentStatsPlayerTwo.decidingSetWin = res.decidingSetWin;
                this.currentStatsPlayerTwo.decidingSetWinPercentage = res.decidingSetWinPercentage;
                this.currentStatsPlayerTwo.firstSetWinMatchWinPercentage = res.firstSetWinMatchWinPercentage;
                this.currentStatsPlayerTwo.firstSetWinMatchWin = res.firstSetWinMatchWin;
                this.currentStatsPlayerTwo.firstSetLoseMatchWinPercentage = res.firstSetLoseMatchWinPercentage;
              });

        })
        }

    })
  }

  getProfileInformation(name1: string, name2:string){
    this.profileService.getStatistics(name1).subscribe(res => {
      this.statistics1 = res;
    })

    this.profileService.getStatistics(name2).subscribe(res => {
      this.statistics2 = res;
    })
  }


}
