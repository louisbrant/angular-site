import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchInterface} from "../../../shared/interfaces/search.interface";
import {TeamSearchService} from "../../../shared/services/team-search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-h2h-search-football-clubs',
  templateUrl: './h2h-search-football-clubs.component.html',
  styleUrls: ['./h2h-search-football-clubs.component.scss']
})
export class H2hSearchFootballClubsComponent implements OnInit {

  firstTeamProfiles?: SearchInterface[] = [];
  secondTeamProfiles?: SearchInterface[] = [];
  firstTeam!: SearchInterface;
  secondTeam!: SearchInterface;

  searcheSubscription: any = null;

  constructor(private teamSearchService: TeamSearchService, private router: Router) { }

  ngOnInit(): void {
  }

  searchTeams(name: string, team:string) {
    if (name?.length > 1) {
      if(this.searcheSubscription != null) {
        this.searcheSubscription.unsubscribe();
      }

      this.searcheSubscription = this.teamSearchService.search(name, true).subscribe((res) => {
        team === 'firstTeam' ? this.firstTeamProfiles = res : this.secondTeamProfiles = res;
      });
    }
  }

  selectTeam(team: SearchInterface, teamOrder:string) {
    teamOrder === 'firstTeam' ? this.firstTeam = team : this.secondTeam = team;
  }

  navigateToH2h() {
    window.location.href = `/football/h2h/${this.firstTeam.id}/${this.secondTeam.id}`
  }

}
