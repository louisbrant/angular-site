import { Component, Input, OnInit } from '@angular/core';
import { PastChampionInterface } from "src/app/shared/interfaces/past-champions";
import { TabActiveInterface } from "src/app/shared/interfaces/tab-active";

import { FilterInterface } from "src/app/shared/interfaces/filter";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-recent-match-selection',
  templateUrl: './recent-match-selection.component.html',
  styleUrls: ['./recent-match-selection.component.scss']
})
export class RecentMatchSelectionComponent implements OnInit {
  public surfaceFilters: FilterInterface[] = [{
    name: "All Surfaces",
    value: 'all',
  }]
  public roundFilters: FilterInterface[] = [{
    name: "All Rounds",
    value: 'all',
  }]
  public yearFilters: FilterInterface[] = [{
    name: "2021",
    value: '2021',
  }]
  public weekFilters: FilterInterface[] = [{
    name: "Week 53",
    value: 'all',
  }]
  public formGroupFilters: FormGroup = new FormGroup({});

  @Input() set champions(v: PastChampionInterface[]) {
    this.selectedChampions = v
  };

  @Input() set singlesChampions(champions: PastChampionInterface[]) {
    this._singlesChampions = champions
    this.selectedChampions = this._singlesChampions
    this.actives[0].isActive = this._singlesChampions.length > 0
  };
  get singlesChampions(): PastChampionInterface[] {
    return this._singlesChampions
  }
  private _singlesChampions: PastChampionInterface[] = [];

  @Input() set doublesChampions(champions: PastChampionInterface[]) {
    this._doublesChampions = champions
    this.actives[1].isActive = this._doublesChampions.length > 0
  };
  get doublesChampions(): PastChampionInterface[] {
    return this._doublesChampions
  }
  private _doublesChampions: PastChampionInterface[] = [];

  public selectedChampions: PastChampionInterface[] = [];

  public maxShow: number = 5;

  public actives: TabActiveInterface[] = [
    { name: 'Singles', active: 'singles', isActive: true },
    { name: 'Doubles', active: 'doubles', isActive: true },
  ];

  constructor() { }

  ngOnInit(): void {
    this.formGroupFilters = new FormGroup({
      surface: new FormControl(this.surfaceFilters[0].value),
      round: new FormControl(this.roundFilters[0].value),
      year: new FormControl(this.yearFilters[0].value),
      week: new FormControl(this.weekFilters[0].value),
    })
  }

  getFormControl(control: string): FormControl {
    return this.formGroupFilters?.controls[control] as FormControl;
  }
  viewMore() {
    this.maxShow += 5;
  }

  changeActive(active: TabActiveInterface) {
    if (active.active == 'singles') this.selectedChampions = this.singlesChampions;
    if (active.active == 'doubles') this.selectedChampions = this.doublesChampions;
  }
}
