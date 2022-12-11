import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "src/app/pages/profile/services/profile.service";
import { TableHeaderInterface } from "src/app/shared/interfaces/table";
import { ProfileInterestingH2hInterface } from "../../../../interfaces/profile-interesting-h2h";

@Component({
  selector: 'app-profile-match-stats-h2h',
  templateUrl: './profile-match-stats-h2h.component.html',
  styleUrls: ['./profile-match-stats-h2h.component.scss']
})
export class ProfileMatchStatsH2hComponent implements OnInit {
  headers: TableHeaderInterface[] = [{ name: 'opponent' }, { name: 'h2h' }];

  leftTable: ProfileInterestingH2hInterface[] = []
  rightTable: ProfileInterestingH2hInterface[] = []
  allTable: ProfileInterestingH2hInterface[] = []
  name: string = ''

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
  ) {
  }

  @Input() type: string | undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.name = params['name'];
      this.leftTable = [];
      this.rightTable = [];
      this.profileService.getInterestingH2h(this.name).subscribe(interestingH2hs => {
        interestingH2hs = interestingH2hs.map((h2h) => ({
          h2h: `H2H ${h2h.h2h}`,
          opponent: h2h.opponent,
          params: [this.name, h2h.opponent]
        }))
        this.allTable = interestingH2hs;
        let center = Math.round(interestingH2hs.length / 2)
        this.leftTable = interestingH2hs!.slice(0, center)
        this.rightTable = interestingH2hs!.slice(center, interestingH2hs.length)
        console.log(this.leftTable)
        console.log(this.rightTable)
        console.log(interestingH2hs)
      })
    })
  }


  navigateToH2h(names: string[]) {
    this.router.navigate(['tennis', 'h2h', `${this.type}`, names[0], names[1]]);
    window.scroll({ top: 0, behavior: 'smooth' })
  }

}
