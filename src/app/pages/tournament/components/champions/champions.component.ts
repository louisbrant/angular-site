import { Component, Input, OnInit } from '@angular/core';
import { PastChampionInterface } from "src/app/shared/interfaces/past-champions";
import { TabActiveInterface } from "src/app/shared/interfaces/tab-active";

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

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

  ngOnInit(): void { }

  viewMore() {
    this.maxShow += 5;
  }

  changeActive(active: TabActiveInterface) {
    if (active.active == 'singles') this.selectedChampions = this.singlesChampions;
    if (active.active == 'doubles') this.selectedChampions = this.doublesChampions;
  }
}
