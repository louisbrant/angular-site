import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss'],
})
export class SportsmanComponent implements OnInit {
  public isUnknown = false;

  @Input() hasLink: boolean = true;
  @Input() isShortName: boolean = true;
  @Input() number: Number = 0;
  @Input() set fullname(name: string) {
    if (name === 'Unknown Player') {
      this.fullnameFirstPerson = 'TBD';
      this.isUnknown = true;
      return;
    }
    this.isUnknown = false;
    let persons = name.split('/');
    this.fullnameFirstPerson = persons[0];
    this.fullnameSecondPerson = persons[1];
    if (persons.length > 0)
      this.firstPerson = this.isShortName
        ? this.shortName(persons[0].trim())
        : persons[0].trim();
    if (persons.length > 1)
      this.secondPerson = this.isShortName
        ? this.shortName(persons[1].trim())
        : persons[1].trim();
  }
  @Input() idkLeague: string | undefined | null;
  @Input() countryCode: string = '';
  @Input() hideCountryBySize: boolean = false;
  @Input() scrollTop: boolean = false;

  @Input() padding: boolean = true;

  constructor(private router: Router) { }

  public fullnameFirstPerson = '';
  public fullnameSecondPerson = '';
  firstPerson = '';
  secondPerson = '';

  ngOnInit(): void { }

  shortName(name: string) {
    if (name === 'Unknown Player') {
      return 'TBD';
    }
    if (name) {
      let details = name.split(' ');
      let lastName = details.pop();
      details = details.map((v) => `${v.charAt(0)}.`);
      return `${details.join(' ')} ${lastName}`;
    }
    return '';
  }

  scrollToTop() {
    if (!this.isUnknown && this.hasLink && this.scrollTop) {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }
}
