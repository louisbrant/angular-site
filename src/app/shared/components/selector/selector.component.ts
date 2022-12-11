import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Input()
  public options!: any[];

  @Input()
  public formControl!: FormControl;

  @Output()
  public formControlChange = new EventEmitter<any>();

  @Input() defaultValue: any
  @Input() type: string = '';
  public select: string = "";
  selectedVal: any
  constructor() { }

  ngOnInit(): void {
    this.selectedVal = this.defaultValue || this.options[0].value || ""
    console.log("this.defaultValue=>", this.defaultValue)
    console.log("this.formControl=>", this.formControl)
    console.log(this.type);
    this.select = "showed";
  }
  change() {
    this.formControlChange.emit(this.selectedVal)
  }
}
