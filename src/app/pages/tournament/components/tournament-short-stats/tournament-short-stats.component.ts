import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { TournamentsHttpService } from "src/app/pages/tournament/services/tournaments-http.service";
import { TournamentYearPickerService } from "src/app/pages/tournament/services/tournament-year-picker.service";
import { MatchVictory } from "src/app/shared/interfaces/match-victory";
import { PastChampionInterface } from "src/app/shared/interfaces/past-champions";
import {
  SportsmanInfoInterface,
  TournamentInfoInterface,
  TournamentPointInterface
} from "src/app/shared/interfaces/short-info";
import { TableHeaderInterface } from "src/app/shared/interfaces/table";
import { PointInterface, TournamentInterface } from "src/app/shared/interfaces/tournament";
import { YearInterface } from "src/app/shared/interfaces/year";
import { MostVictory } from "./interfaces/most-victory";
import { DatePipe } from "@angular/common";
import { FilterInterface } from "src/app/shared/interfaces/filter";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-tournament-short-stats',
  templateUrl: './tournament-short-stats.component.html',
  styleUrls: ['./tournament-short-stats.component.scss']
})
export class TournamentShortStatsComponent implements OnInit {
  headers: TableHeaderInterface[] = [{ name: 'test1' }, { name: 'test2' }];
  currentYear: YearInterface | undefined;
  years: YearInterface[] = []
  yearFilters: FilterInterface[] = [];
  filtersFormGroup = new FormGroup({});

  public tournamentInfoTable: TournamentInfoInterface[] = [];
  public tournamentInfoHeaders: TableHeaderInterface[] = [{ name: 'stat' }, { name: 'value' }];

  public tournamentPointsTable: TournamentPointInterface[] = [];
  public tournamentPointsHeaders: TableHeaderInterface[] = [{ name: 'tour' }, { name: 'score', template: 'pts' }, { name: 'prize', template: 'money' }];

  public pastChampionsTable: SportsmanInfoInterface[] = [];
  public pastChampionsHeaders: TableHeaderInterface[] = [{ name: 'image' }, { name: 'fullname', styles: { 'text-align': 'start' } }, { name: 'countryCode' }, { name: 'value' }];

  public mostVictoriesTable: MostVictory[] = [];
  public mostVictoriesHeaders: TableHeaderInterface[] = [{ name: 'image' }, { name: 'name', styles: { 'text-align': 'start' } }, { name: 'countryAcr' }, { name: 'wins' }];

  public newMostVictoriesHeaders: TableHeaderInterface[] = [{ name: 'image' }, { name: 'name', styles: { 'text-align': 'start' } }, { name: 'countryCode' }, { name: 'victories' }];
  public newTournamentPointsHeaders: TableHeaderInterface[] = [{ name: 'name' }, { name: 'points', template: 'pts' }, { name: 'prize', template: 'money' }];

  @Input() tournamentName = '';
  @Input() tournamentYear = 0;

  private _tournament?: TournamentInterface
  tableHeight: string = '13em';
  @Input() set tournament(v: TournamentInterface) {
    this._tournament = v
    this.tournamentInfoTable = this.parseInfoTable(v);
  }

  @Input() set pastChampions(champions: PastChampionInterface[]) {
    this.pastChampionsTable = this.parsePastChampions(champions.filter(v => v.date.getFullYear() <= this.tournamentYear && v.result != '').slice(0, 5))
  }

  constructor(
    private tournamentService: TournamentsHttpService,
    private activatedRoute: ActivatedRoute,
    private yearPickerService: TournamentYearPickerService,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.yearPickerService.currentYear.subscribe(value => {
      this.currentYear = value
    })
    this.activatedRoute.params.subscribe(params => {
      this.getMostVictories(params['tournament'], params['type'])
      this.yearPickerService.currentYear.subscribe(year => {
        if (year.tournamentName != '' && year.year != 0) {
          this.getPoints(year, params['type'])
        }
      })
    })
    this.activatedRoute.params.subscribe(params => {
      if (this.currentYear) this.currentYear.year = params['year']
      if (!this.currentYear) this.currentYear = { year: params['year'], tournamentName: params['tournament'] }
      this.tournamentName = params['tournament']
      this.yearPickerService.getYearsHttp(params['tournament'], params['type']).subscribe(years => {
        this.yearFilters = years.map((year, i) => {
          return {
            name: years[i - 1] == undefined ? "" : years[i - 1].year + "/" + year.year,
            value: year.year
          }
        })
        let newyears: any
        this.years.map((item, i) => {
          if (i > 0) {
            newyears.push(item);
          }
        })
        this.years = newyears;
        this.filtersFormGroup = new FormGroup({
          year: new FormControl(this.yearFilters[0].value),
        })
        this.filtersFormGroup.valueChanges.subscribe(changes => {
          if (changes?.year) {

          }
        })
        this.years = years.sort((a, b) => b.year - a.year)
      }, error => {

      })
    })


    // this.yearPickerService.currentYear.subscribe(year => {
    //   this.yearFilters = filters.years.map((year, i) => ({ name: filters.years[i - 1] == undefined ? "" : filters.years[i - 1] + "/" + year, value: year }))
    // })
  }

  public navigateToProfile(params: any[]) {
    this.router.navigate(['profile', ...params])
  }

  private getPoints(year: YearInterface, type: string) {
    this.tournamentService.getPoints(year.tournamentName, year.year.toString(), type).subscribe(points => {
      this.tournamentPointsTable = this.parsePoints(points)


      this.tournamentPointsTable.map((item, i) => {
        item.prize = 500.000;
      })



    });
  }

  private getMostVictories(tournamentName: string, type: string) {
    this.tournamentService.getMostVictories(tournamentName, type).subscribe(victories => this.mostVictoriesTable = this.parseMostVictories(victories))
  }

  private parseInfoTable(tournament: TournamentInterface): TournamentInfoInterface[] {
    let prize = tournament.prize
    if (prize && prize[0] != '$') {
      if (prize[0] == '' || prize[0] == '') prize = '€' + prize.slice(1)
    }
    return [
      { stat: 'Rank', value: tournament.rank.name },
      { stat: 'Country', value: tournament.country.name, icon: `assets/icons/flags/${tournament.country.acronym}.svg` },
      { stat: 'Start Date', value: this.datePipe.transform(new Date(tournament.date), 'dd MMM YY') || '' },
      { stat: 'Surfaces', value: tournament.court.name, icon: `assets/icons/${tournament.court.name.toLowerCase()}.svg` },
      { stat: 'Prize Money', value: prize },
    ]
  }

  private parsePoints(points: PointInterface): TournamentPointInterface[] {
    return [
      { name: 'Winner', points: points.winner.points, prize: points.winner.prize },
      { name: 'Finalist', points: points.finalist.points, prize: points.finalist.prize },
      { name: 'SF', points: points.semiFinalist.points, prize: points.semiFinalist.prize },
      { name: 'QF', points: points.quarterFinalist.points, prize: points.quarterFinalist.prize },
      { name: 'Fourth', points: points.fourth.points, prize: points.fourth.prize },
      { name: 'Third', points: points.third.points, prize: points.third.prize },
      { name: 'Second', points: points.second.points, prize: points.second.prize },
      { name: 'First', points: points.first.points, prize: points.first.prize },
      { name: 'Qualifying', points: points.qualifying.points, prize: points.qualifying.prize },
      { name: 'q-Second', points: points.qualifyingSecond.points, prize: points.qualifyingSecond.prize },
      { name: 'q-First', points: points.qualifyingFirst.points, prize: points.qualifyingFirst.prize },
      { name: 'Pre-Q', points: points.preQualifying.points, prize: points.preQualifying.prize },
    ].filter(points => points?.points || points?.prize);
  }

  private parsePastChampions(pastChampions: PastChampionInterface[]): SportsmanInfoInterface[] {
    let champions: any[] = []
    for (let match of pastChampions) {
      champions.push({
        countryCode: match.player1.countryAcr,
        value: new Date(match.date).getFullYear(),
        fullname: match.player1.name,
        image: match.player1.image,
        params: [match.player1.name]
      })
    }
    return champions
  }

  private parseMostVictories(victories: MatchVictory[]): MostVictory[] {
    return victories?.map(v => ({
      victories: v.wins,
      name: v.name,
      countryCode: v.countryAcr,
      image: v.image,
      params: [v.name],
    }));
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl
  }
}
