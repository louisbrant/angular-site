import {Component, Input, OnInit} from '@angular/core';
import {ChampionInterface} from "../../interfaces/champion";

@Component({
  selector: '[drawChampion]',
  templateUrl: './draw-champion.component.html',
  styleUrls: ['./draw-champion.component.scss']
})
export class DrawChampionComponent implements OnInit {

  @Input() champion: ChampionInterface | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
