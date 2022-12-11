import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProfileBreakdownInterface } from "src/app/pages/profile/interfaces/profile-breakdown";
import { ProfileService } from "src/app/pages/profile/services/profile.service";
import { TableHeaderInterface } from 'src/app/shared/interfaces/table';
import { H2HService } from "../../../h2h/h2h.service";

@Component({
  selector: 'app-profile-performance-breakdown',
  templateUrl: './profile-performance-breakdown.component.html',
  styleUrls: ['./profile-performance-breakdown.component.scss']
})
export class ProfilePerformanceBreakdownComponent implements OnInit {
  heightUpperTable = '14.7em';
  heightLowerTable = '12.5em';

  level: any = {}
  rank: any = {}
  surface: any = {}
  round: any = {}
  tableHeaders: TableHeaderInterface[] = [
    { name: 'name' },
    {
      name: 'percent',
      template: 'percent',
      styles: { 'font-weight': 'bold' }
    },
    { name: 'wl' }]

  years: string[] = ['career'];
  currentYear: string = '';
  player!: string;
  breakdownFilters = {
    court: '',
    round: '',
    tournament: '',
    career: ''
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly h2hService: H2HService
  ) { }

  @Input() type!: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.years = [];
      this.level = {};
      this.rank = {};
      this.surface = {};
      this.round = {};
      this.player = params['name'];
      this.profileService.getBreakdown(this.player).subscribe(breakdown => {
        this.years = [...Object.keys(breakdown).reverse()];
        if (this.years.length) this.currentYear = this.years[1];
        this.breakdownFilters.career = this.currentYear;
        this.h2hService.getBreakDownStats(this.type, this.player, this.breakdownFilters).subscribe(res => {
          breakdown.level = res;
          this.parseTournamentLevels(breakdown);
          this.parseOpponentRanks(breakdown)
          this.parseSurfaces(breakdown)
          this.parseRounds(breakdown)
        })
      });
    })
  }

  private getPercent(win: number, lose: number) {
    if (win != 0) return (win) * 100 / (win + lose);
    return 0
  }


  parseTournamentLevels(breakdown: any) {
    this.level = {};

    for (let year of this.years) {
      let currentBreakdown = breakdown[year].level;
      this.level[year] = [
        {
          wl: `${breakdown.level.slam1 + 0} / ${breakdown.level.slam2 + 0}`,
          name: 'Grand Slam',
          percent: this.getPercent(breakdown.level.slam1 + 0, breakdown.level.slam2 + 0)
        },
        {
          wl: `${breakdown.level.master1 + 0} / ${breakdown.level.master2 + 0}`,
          name: 'Masters',
          percent: this.getPercent(breakdown.level.master1 + 0, breakdown.level.master2 + 0)
        },
        {
          wl: `${breakdown.level.main1 + 0} / ${breakdown.level.main2 + 0}`,
          name: 'Main Tour',
          percent: this.getPercent(breakdown.level.main1 + 0, breakdown.level.main2 + 0)
        },
        {
          wl: `${breakdown.level.cup1 + 0} / ${breakdown.level.cup2 + 0}`,
          name: 'Cups',
          percent: this.getPercent(breakdown.level.cup1 + 0, breakdown.level.cup2 + 0)
        },
        {
          wl: `${breakdown.level.challengers1 + 0} / ${breakdown.level.challengers2 + 0}`,
          name: 'Challengers',
          percent: this.getPercent(breakdown.level.challengers1 + 0, breakdown.level.challengers2 + 0)
        },
        {
          wl: `${currentBreakdown.futures.w + 0} / ${currentBreakdown.futures.l + 0}`,
          name: 'Futures',
          percent: this.getPercent(currentBreakdown.futures.w + 0, currentBreakdown.futures.l + 0)
        },
      ]
    }
  }

  selectedYear(event: string): void {
    event === 'career' ? event = '' : event;
    this.breakdownFilters.career = event;
    this.profileService.getBreakdown(this.player).subscribe(breakdown => {
      this.h2hService.getBreakDownStats(this.type, this.player, this.breakdownFilters).subscribe(res => {
        breakdown.level = res;
        this.parseTournamentLevels(breakdown);
      })
    });
  }

  parseOpponentRanks(breakdown: ProfileBreakdownInterface) {
    this.rank = {};

    for (let year of this.years) {
      let currentBreakdown = breakdown[year].rank;
      this.rank[year] = [
        {
          wl: `${currentBreakdown.top1.w + 0}  / ${currentBreakdown.top1.l + 0}`,
          name: 'Vs No.1',
          percent: this.getPercent(currentBreakdown.top1.w + 0, currentBreakdown.top1.l + 0)
        },
        {
          wl: `${currentBreakdown.top5.w + 0} / ${currentBreakdown.top5.l + 0}`,
          name: 'Vs Top.5',
          percent: this.getPercent(currentBreakdown.top5.w + 0, currentBreakdown.top5.l + 0)
        },
        {
          wl: `${currentBreakdown.top10.w + 0} / ${currentBreakdown.top10.l + 0}`,
          name: 'Vs Top.10',
          percent: this.getPercent(currentBreakdown.top10.w + 0, currentBreakdown.top10.l + 0)
        },
        {
          wl: `${currentBreakdown.top20.w + 0} / ${currentBreakdown.top20.l + 0}`,
          name: 'Vs Top.20',
          percent: this.getPercent(currentBreakdown.top20.w + 0, currentBreakdown.top20.l + 0)
        },
        {
          wl: `${currentBreakdown.top50.w + 0} / ${currentBreakdown.top50.l + 0}`,
          name: 'Vs Top.50',
          percent: this.getPercent(currentBreakdown.top50.w + 0, currentBreakdown.top50.l + 0)
        },
        {
          wl: `${currentBreakdown.top100.w + 0} / ${currentBreakdown.top100.l + 0}`,
          name: 'Vs Top.100',
          percent: this.getPercent(currentBreakdown.top100.w + 0, currentBreakdown.top100.l + 0)
        },
      ]
    }
  }

  private generateRound(name: string, win: number | undefined, lose: number | undefined) {
    return {
      name: name,
      wl: win && lose ? `${win} / ${lose}` : win ? `${win} / 0` : `0 / ${lose}`,
      percent: win && lose ? this.getPercent(win!, lose!) : win ? 100 : 0
    }
  }

  parseRounds(breakdown: ProfileBreakdownInterface) {
    this.round = {}

    let groups = [
      { code: '12', name: 'Final' },
      { code: '10', name: 'Semi-Final' },
      { code: '9', name: 'Quarter-Final' },
      { code: '7', name: 'Fourth' },
      { code: '6', name: 'Third' },
      { code: '5', name: 'Second' },
      { code: '4', name: 'First' },
      { code: '3', name: 'Qualifying' },
      { code: '2', name: 'Q-Second round' },
      { code: '1', name: 'Q-First round' },
      { code: '0', name: 'Pre-Q' },
    ]

    for (let year of this.years) {
      let currentBreakdown = breakdown![year].round;
      this.round[year] = []
      for (let group of groups) {
        if (currentBreakdown.hasOwnProperty(group.code)) {
          if (currentBreakdown[group.code]) {
            this.round[year].push(
              this.generateRound(group.name, currentBreakdown[group.code].w, currentBreakdown[group.code].l)
            )
          }
        }
      }
    }
  }

  parseSurfaces(breakdown: ProfileBreakdownInterface) {
    this.surface = {}

    let groups = [
      { code: '1', name: 'Hard' },
      { code: '2', name: 'Clay' },
      { code: '3', name: 'Indoor' },
      { code: '5', name: 'Grass' },
    ]

    for (let year of this.years) {
      let currentBreakdown = breakdown![year].court;
      this.surface[year] = []
      let winCount = 0;
      let loseCount = 0;
      for (let group of groups) {
        if (currentBreakdown.hasOwnProperty(group.code)) {
          if (currentBreakdown[group.code]) {
            if (currentBreakdown[group.code]?.w) winCount += currentBreakdown[group.code].w!
            if (currentBreakdown[group.code]?.l) loseCount += currentBreakdown[group.code].l!
          }
        }
        this.surface[year].push(
          this.generateRound(group.name, currentBreakdown[group.code]?.w ?? 0, currentBreakdown[group.code]?.l ?? 0)
        )
      }
      this.surface[year].unshift(
        this.generateRound('Overall', winCount, loseCount)
      )
    }


  }
}
