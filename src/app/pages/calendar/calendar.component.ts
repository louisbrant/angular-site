import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { FilterInterface } from "src/app/shared/interfaces/filter";
import { FormControl, FormGroup } from "@angular/forms";
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { repeat, skip, take } from "rxjs/operators";
import { TabActiveInterface } from "../../shared/interfaces/tab-active";
import { CalendarTournamentGroupInterface } from "./interfaces/calendar-tournament-group";

interface FilterResponseInterface {
  id: number;
  name: string;
}

export interface CalendarFilterResponseInterface {
  years: string[];
  levels: FilterResponseInterface[];
  surfaces: FilterResponseInterface[];
}

export const COLORS = [
  'orange',
  'green',
  'navygreen',
  'pink',
  'blue',
  'navyblue',
  'violet',
]

export let LEVEL_COLOR: { [key: string]: string } = {}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  actives: TabActiveInterface[] = [
    { name: 'ATP Calendar', active: 'atp', isActive: true },
    { name: 'WTA Calendar', active: 'wta', isActive: true },
  ];

  matchGrouped: CalendarTournamentGroupInterface[] = []

  allLevelFilter: FilterInterface = { name: 'All levels', value: '' }
  allSurfaceFilter: FilterInterface = { name: 'All surfaces', value: '' }

  yearFilter: FilterInterface[] = []
  levelFilter: FilterInterface[] = [this.allLevelFilter]
  surfacesFilter: FilterInterface[] = [this.allSurfaceFilter];

  public activeControl = new FormControl('atp')
  filterFormGroup: FormGroup = new FormGroup({
    year: new FormControl(),
    level: new FormControl(),
    surfaces: new FormControl(),
    search: new FormControl(),
  });

  public subs: Subscription = new Subscription();
  public type: string = 'atp';

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.getCalendarFilters('atp').subscribe((response: CalendarFilterResponseInterface) => {
      this.yearFilter = response.years
        .map(v => (parseInt(v) || 1900))
        .sort((a, b) => b - a)
        .map(v => ({ name: v.toString(), value: v.toString() }))
      this.levelFilter = [this.allLevelFilter, ...response.levels.map(v => ({ name: v.name, value: v.name }))]
      const surfaceFiltersTemp: FilterInterface[] = [{ name: 'All Surfaces', value: '' }]
      for (let court of response.surfaces) {
        let courtValues: string[] = [court.name]
        if (court.id == 4 || court.id == 10 || court.id == 6) continue
        if (court.id == 3) {
          courtValues.push('Carpet');
          courtValues.push('Acrylic');
        }
        surfaceFiltersTemp.push({ name: court.name, value: courtValues.join(',') })
      }
      this.surfacesFilter = surfaceFiltersTemp

      this.getCalendarData('atp', this.yearFilter[0].value)
      LEVEL_COLOR = {}
      for (let ind in response.levels) {
        LEVEL_COLOR[response.levels[ind].name] = COLORS[ind]
      }

      this.filterFormGroup = new FormGroup({
        year: new FormControl(this.yearFilter[0].value),
        level: new FormControl(this.levelFilter[0].value),
        surfaces: new FormControl(this.surfacesFilter[0].value),
        search: new FormControl(''),
      })

      this.subs.unsubscribe()
      this.subs = new Subscription();
      this.subs.add(
        this.filterFormGroup.valueChanges.subscribe(v => {
          this.getCalendarData(this.activeControl.value, v.year, v.level, v.surfaces, v.search)
        }),
      )
    })
  }

  private getCalendarData(type: string, year: string | number, level?: string, surfaces?: string, search?: string) {
    this.calendarService.getCalendar(type, year.toString(), level, surfaces, search).subscribe(result => {
      this.matchGrouped = []
      let week = 0;
      let previousDate = new Date(year.toString())
      let date = new Date(previousDate);
      console.log(new Date(previousDate))
      console.log(date.setDate(date.getDate() + 7));
      console.log((year), date.getFullYear())
      let i = 0;
      // for (let date = new Date(previousDate); i<53; date.setDate(date.getDate() + 7)) {
      //   console.log(type, "++++++++++++++++++++++++++", year)
      // }
      for (let date = new Date(previousDate); i < 53; date.setDate(date.getDate() + 7)) {
        i++;
        let group: CalendarTournamentGroupInterface = {
          week: week,
          date: previousDate.toLocaleDateString('en-US'),
          tournaments: []
        }
        for (let tournament of result) {
          const tourDate = new Date(tournament.date)

          if ((previousDate < tourDate) && (Number(tourDate.setDate(tourDate.getDate() + 0)) < Number(date.setDate(date.getDate() + 0)))) {
            group.tournaments.push({
              date: new Date(tournament.date).toLocaleDateString('en-US'),
              country: tournament.countryAcr,
              prize: tournament.prize || '',
              winner: {
                name: tournament?.games[tournament?.games.length - 1]?.player1?.name || '',
                countryAcr: tournament?.games[tournament?.games.length - 1]?.player1?.countryAcr || '',
                id: tournament?.games[tournament?.games.length - 1]?.player1?.id.toString() || '',
                image: '',
                seed: '',
              },
              name: tournament.name,
              colorStatus: LEVEL_COLOR[tournament.rank.name],
              court: tournament.court.name.toLowerCase().replace(/ /g, ''),
              final: tournament.games[0],
            })
          }
        }
        if (group.tournaments.length) this.matchGrouped.push(group)
        previousDate = new Date(date)
        ++week;
        console.log("group---------->", group);
      }
    })
  }

  changeActive(active: TabActiveInterface) {
    this.type = active.active;
    this.activeControl.setValue(active.active)
    this.getCalendarData(active.active, this.filterFormGroup.value.year, this.filterFormGroup.value.level, this.filterFormGroup.value.surfaces, this.filterFormGroup.value.search)
  }

  getFormControl(control: string): FormControl {
    return this.filterFormGroup?.controls[control] as FormControl
  }

  searchTournaments(tournament: string) {
    this.filterFormGroup.patchValue({
      search: tournament
    })
  }
}
