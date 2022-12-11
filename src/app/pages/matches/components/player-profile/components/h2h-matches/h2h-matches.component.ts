import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentsHttpService } from "src/app/pages/tournament/services/tournaments-http.service";
import { DrawMatchInterface } from 'src/app/shared/interfaces/draw';
import { TabActiveInterface } from "src/app/shared/interfaces/tab-active";
import { YearInterface } from "src/app/shared/interfaces/year";

import { FilterInterface } from "src/app/shared/interfaces/filter";
import { FormControl, FormGroup } from "@angular/forms";
import { TournamentYearPickerService } from "src/app/pages/tournament/services/tournament-year-picker.service";

@Component({
  selector: 'app-h2h-matches',
  templateUrl: './h2h-matches.component.html',
  styleUrls: ['./h2h-matches.component.scss']
})
export class H2hMatchesComponent implements OnInit {
  active: 'singles' | 'doubles' | 'qualifying' = 'singles';

  private _drawSingles: DrawMatchInterface[] = []
  get drawSingles(): DrawMatchInterface[] {
    return this._drawSingles
  }

  yearFilters: FilterInterface[] = [];
  filtersFormGroup = new FormGroup({});
  years: YearInterface[] = []


  private _drawDoubles: DrawMatchInterface[] = []
  get drawDoubles(): DrawMatchInterface[] {
    return this._drawDoubles
  }

  private _drawQualifying: DrawMatchInterface[] = []
  get drawQualifying(): DrawMatchInterface[] {
    return this._drawQualifying
  }

  @Input() tournamentName: string = ''

  selectedDraw: DrawMatchInterface[] = []

  currentYear: any;

  actives: TabActiveInterface[] = [
    { name: 'Singles', active: 'singles' },
    { name: 'Doubles', active: 'doubles' },
    { name: 'Qualifying', active: 'qualifying' }
  ];

  changeActive(active: TabActiveInterface) {
    if (active.active == 'singles') this.selectedDraw = this._drawSingles
    if (active.active == 'doubles') this.selectedDraw = this._drawDoubles
    if (active.active == 'qualifying') this.selectedDraw = this._drawQualifying
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private yearPickerService: TournamentYearPickerService,
    private tournamentService: TournamentsHttpService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this._drawSingles = [];
      this._drawDoubles = [];
      this._drawQualifying = [];
      this.selectedDraw = [];
      this.getTournamentDraws(params['tournament'], params['year'], params['type'])
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

  }

  private getTournamentDraws(name: string, year: string, type: string) {
    this.tournamentService.getDraws(name, year, type).subscribe(draws => {
      this._drawSingles = draws.singles
      this.actives[0].isActive = !!this._drawSingles.length;
      this._drawDoubles = draws.doubles
      this.actives[1].isActive = !!this._drawDoubles.length;
      this._drawQualifying = draws.qualifying
      this.actives[2].isActive = !!this._drawQualifying.length;
      this.setFirstDrawTab()
    })
  }

  private setFirstDrawTab() {
    if (this._drawSingles?.length) {
      this.selectedDraw = this._drawSingles
      this.active = 'singles'
      return
    }
    if (this._drawDoubles?.length) {
      this.selectedDraw = this._drawDoubles
      this.active = 'doubles'
      return
    }
    if (this._drawQualifying?.length) {
      this.selectedDraw = this._drawQualifying;
      this.active = 'qualifying'
    }
  }
  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl
  }
}
