import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FilterInterface} from "src/app/shared/interfaces/filter";

@Component({
  selector: 'app-old-selector',
  templateUrl: './old-selector.component.html',
  styleUrls: ['./old-selector.component.scss']
})
export class OldSelectorComponent implements OnInit {
  control: FormControl = new FormControl('');

  private _options: FilterInterface[] = []
  @Input() set options(value: FilterInterface[]) {
    this._options = value
    this.control.setValue(value[0].value)
  }
  get options(): FilterInterface[] {
    return this._options
  }

  @Output() formControl: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  constructor() { }

  ngOnInit(): void {
    this.formControl.emit(this.control)
  }

  onChange(selectValue: any) {
    this.formControl.emit(selectValue)
  }

}
