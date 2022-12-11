import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { repeat, skip, take, tap } from 'rxjs/operators';
import { ProfileMatchStatTableInterface } from 'src/app/pages/profile/components/profile-match-stats/interfaces/profile-match-stat-table';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';
import { FilterInterface } from 'src/app/shared/interfaces/filter';
import { TableHeaderInterface } from 'src/app/shared/interfaces/table';
import { ProfileInformationInterface } from "src/app/pages/profile/interfaces/profile";

import {
  MatchStatBreakPointRtnInterface,
  MatchStatBreakpointServeInterface,
  MatchStatPositionInterface,
  MatchStatReturnInterface,
  MatchStatServiceInterface,
} from '../../interfaces/profile-match-stat';

@Component({
  selector: 'app-profile-match-stats-tables',
  templateUrl: './profile-match-stats-tables.component.html',
  styleUrls: ['./profile-match-stats-tables.component.scss'],
})
export class ProfileMatchStatsTablesComponent implements OnInit {
  headers: TableHeaderInterface[] = [
    { name: 'name' },
    { name: 'percent', template: 'percent' },
    { name: 'result' },
  ];

  private _info: ProfileInformationInterface | undefined;
  @Input() set info(v: ProfileInformationInterface | undefined) {
    if (v) {
      this._info = v;
    }
  }
  get info(): ProfileInformationInterface | undefined {
    return this._info
  }

  yearFilters: FilterInterface[] = [];

  levelFilters: FilterInterface[] = [{ name: 'All Levels', value: '' }];

  surfaceFilters: FilterInterface[] = [{ name: 'All Surfaces', value: '' }];

  roundFilters: FilterInterface[] = [{ name: 'All Rounds', value: '' }];

  filtersFormGroup = new FormGroup({});

  public serveStats?: ProfileMatchStatTableInterface[];
  public returnStats?: ProfileMatchStatTableInterface[];
  public breakServe?: ProfileMatchStatTableInterface[];
  public breakRtn?: ProfileMatchStatTableInterface[];

  private profileName: string = '';
  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.levelFilters = [{ name: 'All Levels', value: '' }];
      this.surfaceFilters = [{ name: 'All Surfaces', value: '' }];
      this.roundFilters = [{ name: 'All Rounds', value: '' }];
      this.yearFilters = [];
      this.profileName = params['name'];
      this.profileService
        .getProfileFilters(this.profileName)
        .subscribe((filters) => {
          const surfaceFiltersTemp: FilterInterface[] = [
            { name: 'All Surfaces', value: '' },
          ];
          for (let court of filters.courts) {
            let courtValues: string[] = [court.name];
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
            ...filters.rounds.map((round) => ({
              name: round.name,
              value: round.name,
            })),
          ];
          this.levelFilters = [
            { name: 'All Levels', value: '' },
            ...filters.level
              .sort((a, b) => a.id - b.id)
              .map((round) => ({ name: round.name, value: round.id })),
          ];
          this.yearFilters = filters.years.map((year, i) => ({
            name: filters.years[i - 1] == undefined ? "" : filters.years[i - 1] + "/" + year,
            value: year,
          }));

          this.filtersFormGroup = new FormGroup({
            year: new FormControl(this.yearFilters[0].value),
            level: new FormControl(this.levelFilters[0].value),
            court: new FormControl(this.surfaceFilters[0].value),
            round: new FormControl(this.roundFilters[0].value),
          });
          this.fetchProfileMatchStats();

          this.filtersFormGroup.valueChanges.subscribe((changes) => {
            this.fetchProfileMatchStats();
          });
        });
    });
  }

  private fetchProfileMatchStats() {
    this.subs.unsubscribe();
    this.subs = new Subscription();
    this.subs.add(
      this.profileService
        .getMatchStats(this.profileName, this.filtersFormGroup.value)
        .subscribe((matchStats) => {
          this.serveStats = this.parseServiceStats(matchStats.serviceStats);
          this.returnStats = this.parseReturnStats(matchStats.returnStats);
          this.breakServe = this.parseBreakPointsServe(
            matchStats.breakPointsServe
          );
          this.breakRtn = this.parseBreakPointsRtn(matchStats.breakPointsRtn);
        })
    );
  }

  private getCoefficient(firstValue: number, secondValue: number) {
    return (firstValue / secondValue).toFixed(2).toString();
  }

  private calcPercent(property: MatchStatPositionInterface) {
    return (property.value / property.count) * 100;
  }

  private generateResult(property: MatchStatPositionInterface) {
    return `${property.value} - ${property.count - property.value}`;
  }

  private generateResultGame(property: MatchStatPositionInterface) {
    return `${Math.floor(property.value)} / ${Math.floor(property.count)}`;
  }

  private parseServiceStats(serveStats: MatchStatServiceInterface) {
    return [
      {
        name: 'Aces / Game',
        percent: this.getCoefficient(
          serveStats.acesGm.value,
          serveStats.acesGm.count
        ),
        result: this.generateResultGame(serveStats.acesGm),
      },
      {
        name: 'DFs / Game',
        percent: this.getCoefficient(
          serveStats.doubleFaultsGm.value,
          serveStats.doubleFaultsGm.count
        ),
        result: this.generateResultGame(serveStats.doubleFaultsGm),
      },
      {
        name: '1st Srv %',
        percent: this.calcPercent(serveStats.firstServe),
        result: this.generateResultGame(serveStats.firstServe),
      },
      {
        name: '1st Srv W %',
        percent: this.calcPercent(serveStats.winningOnFirstServe),
        result: this.generateResultGame(serveStats.winningOnFirstServe),
      },
      {
        name: '2nd Srv W %',
        percent: this.calcPercent(serveStats.winningOnSecondServe),
        result: this.generateResultGame(serveStats.winningOnSecondServe),
      },
      {
        name: 'Srv Pts W %',
        percent: this.calcPercent(serveStats.srwPtsWin),
        result: this.generateResultGame(serveStats.srwPtsWin),
      },
    ];
  }

  private parseReturnStats(returnStats: MatchStatReturnInterface) {
    return [
      {
        name: 'Opp Aces / Game',
        percent: this.getCoefficient(
          returnStats.opponentAcesGm.value,
          returnStats.opponentAcesGm.count
        ),
        result: this.generateResultGame(returnStats.opponentAcesGm),
      },
      {
        name: 'Opp DFs / Game',
        percent: this.getCoefficient(
          returnStats.opponentDoubleFaultsGm.value,
          returnStats.opponentDoubleFaultsGm.count
        ),
        result: this.generateResultGame(returnStats.opponentDoubleFaultsGm),
      },
      {
        name: 'Opp 1st Srv %',
        percent: this.calcPercent(returnStats.opponentFirstServe),
        result: this.generateResultGame(returnStats.opponentFirstServe),
      },
      {
        name: '1st Rtn W %',
        percent: this.calcPercent(returnStats.opponentWinningOnFirstServe),
        result: this.generateResultGame(
          returnStats.opponentWinningOnFirstServe
        ),
      },
      {
        name: '2nd Rtn W %',
        percent: this.calcPercent(returnStats.opponentWinningOnSecondServe),
        result: this.generateResultGame(
          returnStats.opponentWinningOnSecondServe
        ),
      },
      {
        name: 'Rtn Pts W %',
        percent: this.calcPercent(returnStats.opponentSrwPtsWin),
        result: this.generateResultGame(returnStats.opponentSrwPtsWin),
      },
    ];
  }

  private parseBreakPointsServe(breakServe: MatchStatBreakpointServeInterface) {
    return [
      {
        name: 'BPs Saved / Game',
        percent: this.getCoefficient(
          breakServe.breakPointSavedGm.value,
          breakServe.breakPointSavedGm.count
        ),
        result: this.generateResultGame(breakServe.breakPointSavedGm),
      },
      {
        name: 'BPs Faced / Game',
        percent: this.getCoefficient(
          breakServe.breakPointFacedGm.value,
          breakServe.breakPointFacedGm.count
        ),
        result: this.generateResultGame(breakServe.breakPointFacedGm),
      },
      {
        name: 'BP Save %',
        percent: this.calcPercent(breakServe.breakPointSave),
        result: this.generateResultGame(breakServe.breakPointSave),
      },
      {
        name: 'Service Hold %',
        percent: this.calcPercent(breakServe.serviceHold),
        result: this.generateResultGame(breakServe.serviceHold),
      },
    ];
  }

  private parseBreakPointsRtn(breakRtn: MatchStatBreakPointRtnInterface) {
    return [
      {
        name: 'BPs Won / Game',
        percent: this.getCoefficient(
          breakRtn.breakPointWonGm.value,
          breakRtn.breakPointWonGm.count
        ),
        result: this.generateResultGame(breakRtn.breakPointWonGm),
      },
      {
        name: 'BPs Opps / Game',
        percent: this.getCoefficient(
          breakRtn.breakPointChanceGm.value,
          breakRtn.breakPointChanceGm.count
        ),
        result: this.generateResultGame(breakRtn.breakPointChanceGm),
      },
      {
        name: 'BP Won %',
        percent: this.calcPercent(breakRtn.breakPointWon),
        result: this.generateResultGame(breakRtn.breakPointWon),
      },
      {
        name: 'Opp Hold %',
        percent: this.calcPercent(breakRtn.opponentHold),
        result: this.generateResultGame(breakRtn.opponentHold),
      },
    ];
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl;
  }
}
