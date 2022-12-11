import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OldDrawMatchInterface } from '../../interfaces/draw';
import { TabActiveInterface } from "../../interfaces/tab-active";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  currentActive?: TabActiveInterface;

  private _drawSingles: OldDrawMatchInterface[] = []
  @Input() set drawSingles(v: OldDrawMatchInterface[]) {
    this._drawSingles = v
  }
  get drawSingles(): OldDrawMatchInterface[] {
    return this._drawSingles
  }

  private _actives: TabActiveInterface[] = []
  @Input() set actives(v: TabActiveInterface[]) {
    this._actives = v
    this.currentActive = this._actives.filter(v => v.isActive)[0] ?? ''
  }
  get actives(): TabActiveInterface[] {
    return this._actives
  }

  @Output() activeChanged: EventEmitter<TabActiveInterface> = new EventEmitter<TabActiveInterface>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changeActive(active: TabActiveInterface) {
    if (this.currentActive != active) {
      console.log("===", active);
      this.activeChanged.emit(active)
      this.currentActive = active
      this.cdr.detectChanges()
    }
  }
}
