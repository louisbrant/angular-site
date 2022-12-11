import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TournamentYearPickerService} from "src/app/pages/tournament/services/tournament-year-picker.service";
import {YearInterface} from "src/app/shared/interfaces/year";


@Component({
  selector: 'app-tournament-year-picker',
  templateUrl: './tournament-year-picker.component.html',
  styleUrls: ['./tournament-year-picker.component.scss']
})
export class TournamentYearPickerComponent implements OnInit {

  @Input() selectedYear: YearInterface | undefined

  years: YearInterface[] = []
  show: boolean = false;

  selectedTournament = ''

  private _uniqueKey: any;

  private yearSub = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private yearPickerService: TournamentYearPickerService
  ) { }

  ngOnInit(): void {
    this._uniqueKey = {key: this.selectedYear}

    this.activatedRoute.params.subscribe(params => {
      if (this.selectedYear) this.selectedYear.year = params['year']
      if (!this.selectedYear) this.selectedYear = {year: params['year'], tournamentName: params['tournament']}
      this.selectedTournament = params['tournament']
      this.yearPickerService.getYearsHttp(params['tournament'], params['type']).subscribe(years => {
        this.years = years.sort((a, b) => b.year - a.year)
      }, error => {
        if (error.error?.years) {
          this.years = error.error?.years
            .map((r: string) => ({year: parseInt(r)}))
            .sort((a: YearInterface, b: YearInterface) => b.year - a.year);
        }
      })
    })

    this.yearPickerService.openPopUp.subscribe(v => {
      if (this._uniqueKey != v) this.show = false;
    })
  }

  showStats() {
    this.yearPickerService.openPopUp.next(this._uniqueKey)
    this.show = !this.show;
  }

  selectYear(year: number, name: string) {
    this.yearSub.add(this.activatedRoute.url.subscribe(url => {
      if (this.selectedYear) {
        let newUrl = url.map(v => v.path)
        newUrl[url.length - 1] = year.toString()
        newUrl[url.length - 2] = name
        newUrl[0] = '/' + newUrl[0]
        this.router.navigate(newUrl)
        this.yearSub.unsubscribe()
        this.show = false;
      }
    }))
  }
  onClickedOutside() {
    this.show = false;
  }

}
