import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss']
})
export class YearPickerComponent implements OnInit {

  selectedYear?: string

  private _years: string[] = []
  @Input() set years (years: string[]) {
    this._years = years;
    this.selectedYear = this._years[0]
  }
  get years(): string[] {
    return this._years;
  }

  @Output() changeYear = new EventEmitter();

  show: boolean = false;

  selectedTournament = ''

  constructor() { }

  ngOnInit(): void {

  }

  showStats() {
    this.show = !this.show;
  }

  selectYear(year: string) {
    this.changeYear.emit(year);
    this.selectedYear = year;
    this.show = false;
  }

  onClickedOutside() {
    this.show = false;
  }
}
