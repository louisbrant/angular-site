import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[coef]',
  templateUrl: './coef.component.html',
  styleUrls: ['./coef.component.scss']
})
export class CoefComponent implements OnInit {

  @Input() coef: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
