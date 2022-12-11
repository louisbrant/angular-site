import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { skip } from 'rxjs/operators';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';
import { FilterInterface } from 'src/app/shared/interfaces/filter';
import { GroupMatchesPlayedInterface } from 'src/app/shared/interfaces/group-matches-played';
import { H2HService } from '../../h2h.service';

@Component({
  selector: 'app-h2h-recent-matches-played',
  templateUrl: './h2h-recent-matches-played.component.html',
  styleUrls: ['./h2h-recent-matches-played.component.scss'],

})
export class H2hRecentMatchesPlayedComponent implements OnInit {
  @Input() type!:string;
  @Input() name!:string | null;

  @Output()
  public readonly selectFilters = new EventEmitter<any>();

  surfaceFilters: FilterInterface[] = [
    {name: 'All Surfaces', value: ''}
  ]

  roundFilters: FilterInterface[] = [
    {name: 'All Rounds', value: ''}
  ]

  yearFilters: FilterInterface[] = []

  weekFilters: FilterInterface[] = [
    {name: 'Week 53', value: ''}
  ]

  recentMatches: any[] = [];

  currentPage: number = 1;
  matchesCount = 0;

  filtersFormGroup = new FormGroup({});

  public profileName = ''

  public subs: Subscription = new Subscription()

  constructor(private profileService: ProfileService, private h2hService: H2HService, private activatedRoute: ActivatedRoute
    ) {
  }


  ngOnInit(): void {
    if(this.name){
      this.generateWeekFilter();
      this.getFilters(this.name)
    }
  }

  private getFilters(profileName: string) {
    this.profileService.getProfileFilters(profileName).subscribe(filters => {

      const surfaceFiltersTemp: FilterInterface[] = [{name: 'All Surfaces', value: ''}]
      for (let court of filters.courts) {
        let courtValues = [court.name]
        if (court.id == 4 || court.id == 10 || court.id == 6) continue
        if (court.id == 3) {
          courtValues.push('Carpet');
          courtValues.push('Acrylic');
        }
        surfaceFiltersTemp.push({name: court.name, value: courtValues.join(',')})
      }
      this.surfaceFilters = surfaceFiltersTemp

      this.roundFilters = [
        {name: 'All Rounds', value: ''},
        ...filters.rounds
          .map(round => ({name: round.name, value: round.name}))
      ]

      this.yearFilters = filters.years.map(year => ({name: year, value: year}))

      this.filtersFormGroup = new FormGroup({
        court: new FormControl(this.surfaceFilters[0].value),
        round: new FormControl(this.roundFilters[0].value),
        year: new FormControl(this.yearFilters[0].value),
        week: new FormControl(this.weekFilters[0].value),
      })
      this.fetchH2hRecentMatches(this.filtersFormGroup.value)

      this.subs.unsubscribe()
      this.subs = new Subscription()
      this.subs.add(
        this.filtersFormGroup.valueChanges.subscribe(changes => {
          if (changes?.year) {
            this.currentPage = 1;
            if(this.name){
              this.fetchH2hRecentMatches(changes)
            }
          }
        })
      )
    })
  }

  private fetchH2hRecentMatches(changes: any) {
    this.h2hService.getRecentMatches(this.type, this.name!, changes, this.currentPage).subscribe(matches =>{
      this.recentMatches = matches.games;
      this.matchesCount = matches.count;
    });
  }

  private generateWeekFilter() {
    let week = 52
    this.weekFilters = []
    while (week > 0) {
      this.weekFilters.push({ name: `Week ${week}`, value: week--})
    }
  }

  public nextPage() {
    if(this.name){
      ++this.currentPage;
      this.h2hService.getRecentMatches(this.type, this.name, this.filtersFormGroup.value, this.currentPage).subscribe(matches => {
      this.recentMatches = [...this.recentMatches, ...matches.games];

      });
   }
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl;
  }
}
