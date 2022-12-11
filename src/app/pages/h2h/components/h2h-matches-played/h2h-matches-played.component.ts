import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {skip} from 'rxjs/operators';
import {ProfileService} from 'src/app/pages/profile/services/profile.service';
import {FilterInterface} from 'src/app/shared/interfaces/filter';
import {OldPlayerInterface} from "src/app/shared/interfaces/player";
import {H2HService} from '../../h2h.service';

interface H2hMatchPlayedMockInterface {
  firstPlayer?: OldPlayerInterface
  secondPlayer?: OldPlayerInterface
  score?: string;
  stats?: any
  group?: string
}

@Component({
  selector: 'app-h2h-matches-played',
  templateUrl: './h2h-matches-played.component.html',
  styleUrls: ['./h2h-matches-played.component.scss']
})
export class H2hMatchesPlayedComponent implements OnInit {
  playerOne = '';
  playerTwo = '';
  type: string = 'atp';

  surfaceFilters: FilterInterface[] = [
    {name: 'All Surfaces', value: ''}
  ];

  roundFilters: FilterInterface[] = [
    {name: 'All Rounds', value: ''}
  ];

  matches: any = [];
  currentPage: number = 1;
  matchesCount = 0;

  public subs: Subscription = new Subscription();

  filtersFormGroup = new FormGroup({});

  constructor(private h2hService: H2HService, private profileService: ProfileService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.playerOne = params['playerOne']
      this.playerTwo = params['playerTwo']
      this.type = params['type']
      this.getFilters()
    })
  }

  navigateToTournament(name: string, date: string) {
    const tournamentDate = new Date(date).getFullYear();
    return `/tennis/tournaments/${this.type}/${name}/${tournamentDate}`
  }

  public get playerOneName(): string | null {
    return this.playerOne ? this.playerOne.split(' ')[1] : null;
  }

  public get playerTwoName(): string | null {
    return this.playerTwo ? this.playerTwo.split(' ')[1] : null;
  }

  private getFilters() {
    this.profileService.getProfileFilters(this.playerOne).subscribe(filters => {
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
      this.surfaceFilters = surfaceFiltersTemp;

      this.roundFilters = [
        {name: 'All Rounds', value: ''},
        ...filters.rounds
          .map(round => ({name: round.name, value: round.name}))
      ]

      this.filtersFormGroup = new FormGroup({
        court: new FormControl(this.surfaceFilters[0].value),
        round: new FormControl(this.roundFilters[0].value),
      })
      this.fetchH2hMatchesPlayed(this.filtersFormGroup.value)
      this.subs.unsubscribe()
      this.subs = new Subscription()
      this.subs.add(
        this.filtersFormGroup.valueChanges.subscribe(changes => {
          this.matches = [];
          this.matchesCount = 0;
          this.currentPage = 1;
          this.fetchH2hMatchesPlayed(changes)
        })
      )
    })
  }

  public nextPage() {
    ++this.currentPage;
    this.h2hService.getMatchesHistory(this.type, this.playerOne, this.playerTwo, this.filtersFormGroup.value, this.currentPage).subscribe(matches => {
      this.matches = [...this.matches, ...matches.singles]
      this.matchesCount = matches.singlesCount;
    });
  }

  public fetchH2hMatchesPlayed(changes: any) {
    this.h2hService.getMatchesHistory(this.type, this.playerOne, this.playerTwo, changes, this.currentPage).subscribe(matches => {
      this.matches = matches.singles
      this.matchesCount = matches.singlesCount;
    });
  }

  getFormControl(control: string): FormControl {
    return this.filtersFormGroup?.controls[control] as FormControl
  }
}
