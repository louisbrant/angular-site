import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TournamentsHttpService } from "src/app/pages/tournament/services/tournaments-http.service";
import { TournamentYearPickerService } from "src/app/pages/tournament/services/tournament-year-picker.service";
import { PastChampionInterface } from "src/app/shared/interfaces/past-champions";
import { OldTournamentInterface, TournamentInterface } from 'src/app/shared/interfaces/tournament';
import { YearInterface } from "src/app/shared/interfaces/year";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  tournamentIsLoad = false;
  tournamentLoadError = false;

  currentYear: YearInterface | undefined;
  oldCurrentTournament?: OldTournamentInterface;
  currentTournament?: TournamentInterface;
  singlesPastChampions: PastChampionInterface[] = [];
  doublesPastChampions: PastChampionInterface[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tournamentHttpService: TournamentsHttpService,
    private yearPickerService: TournamentYearPickerService,
  ) { }

  ngOnInit(): void {
    this.yearPickerService.currentYear.subscribe(value => {
      this.currentYear = value
    })

    this.activatedRoute.params.subscribe(params => {
      this.yearPickerService.setCurrentYear({ year: params['year'], tournamentName: params['tournament'] })
      this.changeTournamentRoute(params['type'], params['tournament'], params['year'])
    })
  }

  private changeTournamentRoute(type: string, tournament: string, year: string) {
    this.tournamentHttpService.getTournament(type, tournament, year).subscribe(result => {
      this.tournamentIsLoad = true;
      this.tournamentLoadError = false;
      this.currentTournament = result
    }, () => {
      this.tournamentIsLoad = true;
      this.tournamentLoadError = true;
      this.currentTournament = undefined
    });
    this.tournamentHttpService.getPastChampions(tournament, year, type).subscribe(result => {
      this.singlesPastChampions = result.singlesChampions.filter(v => v.result != '').map(draw => ({
        ...draw,
        date: new Date(draw.date || draw.tournament.date)
      }))
      this.doublesPastChampions = result.doublesChampions.map(draw => ({
        ...draw,
        date: new Date(draw.date || draw.tournament.date)
      }))
    }, () => {
      this.singlesPastChampions = []
      this.doublesPastChampions = []
    })
  }
}
