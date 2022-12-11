import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-performance-year-picker',
  templateUrl: './profile-performance-year-picker.component.html',
  styleUrls: ['./profile-performance-year-picker.component.scss']
})
export class ProfilePerformanceYearPickerComponent implements OnInit {

  @Input() selectedYear: string = ''
  @Input() years: string[] = []
  show: boolean = false;

  @Output() changeYear = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {}

  showStats() {
    this.show = !this.show;
  }

  selectYear(year: string) {
    this.changeYear.emit(year)
    this.show = false;
  }
  onClickedOutside() {
    this.show = false;
  }
}
