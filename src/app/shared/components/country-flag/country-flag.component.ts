import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss']
})
export class CountryFlagComponent implements OnInit {

  @Input() countryCode = ''
  @Input() hideCountryBySize = false
  @Input() width: string = '1.9em'
  @Input() height: string = '1.9em'
  @Input() borderRadius: string = "0px"
  constructor() { }

  ngOnInit(): void {
  }

}
