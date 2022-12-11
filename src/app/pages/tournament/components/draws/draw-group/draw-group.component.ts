import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DrawMatchInterface } from 'src/app/shared/interfaces/draw';
import { GROUPS } from "src/app/shared/variables/groups";
import { MatDialog } from '@angular/material/dialog';
import { PlayersPopupComponent } from './components/players-popup/players-popup.component';

@Component({
  selector: '[drawTable]',
  templateUrl: './draw-group.component.html',
  styleUrls: ['./draw-group.component.scss']
})
export class DrawGroupComponent implements OnInit {

  @Input() set draws(value: DrawMatchInterface[]) {
    this.groupDraws = this.getGroupedDraws(value)
  };
  groupDraws: (DrawMatchInterface | { group: string })[] | any = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    console.log(this.groupDraws);
  }

  public getGroupedDraws(value: DrawMatchInterface[]): any[] {
    let drawGroups: number[] = [...new Set(value.map(v => v.roundId))].sort((a, b) => b - a)
    let groups = []
    for (let drawGroup of drawGroups) {
      groups.push({ group: drawGroup, draws: value.filter(v => v.roundId == drawGroup) })
    }
    let draws = [], passcount = 0;
    for (let group of groups) {
      group.draws.map((item, i) => {
        passcount++;
        if (passcount == 1 || passcount == 2 || passcount == 3) {
          item.draw = "list";
        }
        if (Number(item ? item?.odd1 : Number) < 1) {
          item.odd1 = Number(item.odd1) == 0 ? "" : item.odd1 + "-" + "zerobtn";
        }
        else if (Number(item ? item?.odd1 : Number) < 2) {
          item.odd1 = Number(item.odd1) == 0 ? "" : item.odd1 + "-" + "onebtn";
        }
        else if (Number(item ? item?.odd1 : Number) < 3) {
          item.odd1 = Number(item.odd1) == 0 ? "" : item.odd1 + "-" + "twobtn";
        }
        else {
          item.odd1 = Number(item.odd1) == 0 ? "" : item.odd1 + "-" + "threebtn";
        }

        if (Number(item ? item?.odd2 : Number) < 1) {
          item.odd2 = Number(item.odd2) == 0 ? "" : item.odd2 + "-" + "zerobtn";
        }
        else if (Number(item ? item?.odd2 : Number) < 2) {
          item.odd2 = Number(item.odd2) == 0 ? "" : item.odd2 + "-" + "onebtn";
        }
        else if (Number(item ? item?.odd2 : Number) < 3) {
          item.odd2 = Number(item.odd2) == 0 ? "" : item.odd2 + "-" + "twobtn";
        }
        else {
          item.odd2 = Number(item.odd2) == 0 ? "" : item.odd2 + "-" + "threebtn";
        }
      })
      draws.push(group)
      draws.push(...group.draws)
    }
    console.log(draws);
    return draws
  }

  public getGroupName(groupNumber: number): string {
    return GROUPS[groupNumber] || 'Unknown'
  }


  navigateToH2h(name: string, name2: string) {
    // if (name != 'Unknown Player' && name2 != 'Unknown Player') {
    // this.router.navigate(['tennis', 'h2h', 'atp', name, name2])
    // window.scroll({ top: 0, behavior: 'smooth' })
    // }
  }
  public playersshow(data: DrawMatchInterface) {
    this.dialog.open(PlayersPopupComponent, {
      // width: '480px',
      // height: '480px',
      data: data
    });
  }
}
