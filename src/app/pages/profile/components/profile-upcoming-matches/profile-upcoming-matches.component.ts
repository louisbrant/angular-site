import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "src/app/pages/profile/services/profile.service";
import { OldPlayerInterface } from 'src/app/shared/interfaces/player';
import {UpcomingInterface} from "src/app/shared/interfaces/upcoming";

interface UpcomingMatchMockInterface {
  round: string;
  event: string;
  opponent: OldPlayerInterface;
  result?: string;
  k1: number;
  k2: number;
  h2h: string;
}

@Component({
  selector: 'app-profile-upcoming-matchs',
  templateUrl: './profile-upcoming-matches.component.html',
  styleUrls: ['./profile-upcoming-matches.component.scss']
})
export class ProfileUpcomingMatchesComponent implements OnInit {

  upcomingMatches: UpcomingInterface[] = [];
  selectedName: string = '';

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }
  @Input() type: string | undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.upcomingMatches = []
      this.selectedName = params['name']
      this.profileService.getUpcomingMatches(params['name']).subscribe(upcoming => {
        this.upcomingMatches = upcoming
      })
    })
  }

  navigateToTournament(name: string, year: string) {
    this.router.navigate(['tennis', 'tournaments', `${this.type}`, name, new Date(year).getFullYear()])
  }

  navigateToH2h(name: string, name2: string) {
    if (name != 'Unknown Player' && name2 != 'Unknown Player') {
      this.router.navigate(['tennis', 'h2h', 'atp', name, name2])
      window.scroll({top: 0, behavior: 'smooth'})
    }
  }
}
