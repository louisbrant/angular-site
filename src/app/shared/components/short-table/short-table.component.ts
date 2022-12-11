import {Component, Input, OnInit} from '@angular/core';
import {ROW_TYPES, TableHeaderInterface, TableInterface} from "../../interfaces/table";

@Component({
  selector: 'app-short-table',
  templateUrl: './short-table.component.html',
  styleUrls: ['./short-table.component.scss']
})
export class ShortTableComponent implements OnInit {

  @Input() data: any = null;
  @Input() headers: TableHeaderInterface[] | null = null;
  @Input() showHeader: boolean = false;
  @Input() maxHeight: string | null = '';
  @Input() height: string | null = '';
  @Input() dark: boolean = false;
  @Input() clickEvent: any;
  @Input() clickEventParams: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  public isNumber(rowElement: any) {
    return typeof rowElement == 'number';
  }
}
