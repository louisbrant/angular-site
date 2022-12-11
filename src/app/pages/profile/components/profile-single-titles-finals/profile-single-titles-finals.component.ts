import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "src/app/pages/profile/services/profile.service";
import { SinglesInterface } from "../../interfaces/profile-singles-finals";

@Component({
  selector: 'app-profile-single-titles-finals',
  templateUrl: './profile-single-titles-finals.component.html',
  styleUrls: ['./profile-single-titles-finals.component.scss']
})
export class ProfileSingleTitlesFinalsComponent implements OnInit {

  titles: SinglesInterface[] = []
  finals: SinglesInterface[] = []

  @Input() years: string[] = []
  @Input() type: string | undefined;

  profileName = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.profileName = params['name']
      this.finals = [];
      this.titles = [];
      this.getSinglesFinals(this.profileName, this.years[0])
    })
  }

  changeYear(year: string) {
    this.getSinglesFinals(this.profileName, year)
  }

  private getSinglesFinals(name: string, year: string) {
    this.profileService.getSinglesFinals(name, year).subscribe(finals => {
      this.finals = finals.finals;
      this.titles = finals.titles;
    })
  }

  navigateToTournament(name: string, year: string) {

    this.router.navigate(['tennis', 'tournaments', `${this.type}`, name, new Date(year).getFullYear()])
  }
}
