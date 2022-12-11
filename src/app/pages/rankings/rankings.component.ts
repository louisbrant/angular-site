import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subscription } from "rxjs";
import { RankingService } from "src/app/pages/rankings/services/ranking.service";
import { CountryInterface } from "src/app/shared/interfaces/country";
import { CourtInterface } from "src/app/shared/interfaces/court";
import { FilterInterface } from "src/app/shared/interfaces/filter";
import { TabActiveInterface } from "src/app/shared/interfaces/tab-active";
import { RankingPlayerStatInterface } from "./interfaces/ranking-player-stat";
import { RankingTableInterface } from "./interfaces/ranking-table";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit, AfterViewInit {
  public sizeOfArrowTabActivewidth = '10em';
  public sizeOfArrowTabActivebag = 'green';
  public sizeOfArrowTabGroupwidth = '7em';
  public sizeOfArrowTabGroupbag = 'fst';
  @ViewChild('dateFilter') dateFilter!: TemplateRef<any>;
  @ViewChild('countryFilter') countryFilter!: TemplateRef<any>;
  @ViewChild('surfaceFilter') surfaceFilter!: TemplateRef<any>;

  @ViewChild('defaultHeader') defaultHeader!: TemplateRef<any>;
  @ViewChild('doubleHeader') doubleHeader!: TemplateRef<any>;
  @ViewChild('raceHeader') raceHeader!: TemplateRef<any>;
  @ViewChild('prizeHeader') prizeHeader!: TemplateRef<any>;

  @ViewChild('defaultBody') defaultBody!: TemplateRef<any>;
  @ViewChild('doublesBody') doublesBody!: TemplateRef<any>;
  @ViewChild('raceBody') raceBody!: TemplateRef<any>;
  @ViewChild('prizeBody') prizeBody!: TemplateRef<any>;

  currentTable?: RankingTableInterface

  activeTypes: TabActiveInterface[] = [
    { name: 'ATP Calendar', active: 'atp', isActive: true },
    { name: 'WTA Calendar', active: 'wta', isActive: true },
  ];

  activeGroups: TabActiveInterface[] = [
    { name: 'Singles', active: 'singles', isActive: true },
    { name: 'Doubles', active: 'doubles', isActive: true },
    { name: 'Race', active: 'race', isActive: true },
    { name: 'By Surface', active: 'surface', isActive: true },
    { name: 'Prize Money', active: 'prize', isActive: true },
  ]

  private $selectedType: BehaviorSubject<'atp' | 'wta'> = new BehaviorSubject<"atp" | "wta">('atp');
  public selectedGroup: 'singles' | 'doubles' | 'race' | 'surface' | 'prize' = 'singles';

  public countryFilters: FilterInterface[] = [{ name: 'loading...', value: '' }]
  public surfaceFilters: FilterInterface[] = [{ name: 'loading...', value: '' }]
  public dateFilters: FilterInterface[] = []

  public formGroupFilters: FormGroup = new FormGroup({});
  public playerStats: RankingPlayerStatInterface[] = [];
  public subs: Subscription = new Subscription();
  public page = 0;
  public active: TabActiveInterface = this.activeGroups[0]
  public type: string = 'atp';
  constructor(
    private rankingService: RankingService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    console.log("this.defaultHeader=>", this.defaultBody);
    this.$selectedType.subscribe(type => {
      this.playerStats = []
      this.getRankingFilters(type)
    })
  }

  ngAfterViewInit() {
    this.currentTable = {
      header: this.defaultHeader,
      body: this.defaultBody,
      filters: [this.dateFilter, this.countryFilter],
    }
  }

  public changeActiveType(active: TabActiveInterface) {

    if (active.active == 'atp' || active.active == 'wta')
      this.$selectedType.next(active.active)
    this.page = 0
    this.type = active.active
  }

  public changeActiveGroup(active: TabActiveInterface) {
    console.log(active);
    this.active = active;
    this.page = 0
    this.selectedGroup = active.active as 'singles' | 'doubles' | 'race' | 'prize' | 'surface';
    let templates: any;
    if (active.active == 'singles') {
      templates = {
        header: this.defaultHeader,
        body: this.defaultBody,
        filters: [this.dateFilter, this.countryFilter],
      }
    }
    if (active.active == 'doubles') {
      templates = {
        header: this.doubleHeader,
        body: this.doublesBody,
        filters: [this.dateFilter, this.countryFilter],
      }
    }
    if (active.active == 'surface') {
      templates = {
        header: this.doubleHeader,
        body: this.doublesBody,
        filters: [this.countryFilter]
      }
    }
    if (active.active == 'race') {
      templates = {
        header: this.raceHeader,
        body: this.raceBody,
        filters: [this.countryFilter],
      }
    }
    if (active.active == 'prize') {
      templates = {
        header: this.prizeHeader,
        body: this.prizeBody
      }
    }

    this.currentTable = {
      header: templates?.header,
      body: templates?.body,
      filters: templates?.filters,
    }

    this.playerStats = []

    this.getRanking()
  }

  private getRanking() {
    function mapResponse(response: any) {
      return response.map((ranking: RankingPlayerStatInterface) => ({
        player: ranking.player,
        position: ranking.position,
        pts: ranking.pts,
        wkPts: ranking.wkPts,
        wk: ranking.wk,
        yr: ranking.yr,
        prize: `$${ranking.prize}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      }))
    }

    this.rankingService.getRanking(
      this.$selectedType.value,
      this.formGroupFilters.value.date,
      this.formGroupFilters.value.country,
      this.active.active,
      this.page
    ).subscribe(rankings => {
      if (this.page == 0) {
        this.playerStats = mapResponse(rankings)
      } else {
        this.playerStats.push(...mapResponse(rankings))
      }
    })
  }

  private getRankingFilters(type: 'atp' | 'wta') {
    this.rankingService.getRankingFilters(type).subscribe(filters => {
      this.generateCountryFilter(filters.countries)
      this.generateDateFilter(filters.date)
      this.generateSurfaceFilter(filters.surfaces)
      console.log(this.dateFilters[0].value)
      this.formGroupFilters = new FormGroup({
        date: new FormControl(this.dateFilters[0].value),
        country: new FormControl(this.countryFilters[0].value),

      })
      this.getRanking()
    })
  }

  private generateCountryFilter(countries: CountryInterface[]) {
    this.countryFilters = [
      { name: 'All Countries', value: '' },
      ...countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(country => ({ name: country.name, value: country.acronym }))
    ]
  }

  private generateDateFilter(dates: Date[]) {
    this.dateFilters = dates.map(date => {
      const dateFormatValue = new Date(date).toLocaleDateString('ru')
      const dateFormat: string = this.datePipe.transform(new Date(date), 'dd mm YY') || ''
      return {
        name: dateFormat, value: dateFormatValue
      }
    })
  }

  private generateSurfaceFilter(surfaces: CourtInterface[]) {
    this.surfaceFilters = [
      { name: 'All Surfaces', value: '' },
      ...surfaces
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(surface => ({ name: surface.name, value: surface.name }))
    ]
  }

  addControl($event: FormControl, nameControl: string) {
    this.formGroupFilters.removeControl(nameControl)
    this.formGroupFilters.addControl(nameControl, $event)
  }

  nextPage() {
    console.log(this.formGroupFilters)
    this.page = this.page + 1;
    this.getRanking()
  }

  getFormControl(control: string): FormControl {
    return this.formGroupFilters?.controls[control] as FormControl;
  }
}
