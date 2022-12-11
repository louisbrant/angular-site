import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject, timer} from "rxjs";
import {Router} from "@angular/router";
import {debounce, tap} from "rxjs/operators";
import {SearchInterface} from "../../interfaces/search.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = 'Search Team';
  @Input() isMenu: boolean = false;
  @Input() size: 'short' | 'medium' = 'medium'
  @Input() showBorder = false
  @Input() listResult: any = [];

  @Input() modalTemplate!: TemplateRef<any>;
  @Input() name: string = ''

  @Input() isDebounce: boolean = false;
  @Input() debounceTime: number = 500;
  @Input() firstTeamId!: number;
  @Output() control: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  @Output() eventSubmit = new EventEmitter()
  @Output() teamName = new EventEmitter()

  public showListResult: boolean = false;
  public focus = false;
  public searchControl: FormControl = new FormControl('');

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    if (this.isDebounce) {
      this.searchControl.valueChanges.pipe(
        tap(v => {
          this.listResult = [];
        }),
        debounce(() => timer(this.debounceTime))
      ).subscribe(result => {
        this.search();
      })
    }
  }

  search() {
    this.eventSubmit.emit(this.searchControl.value);
  }

  focusIn($event: FocusEvent) {
    this.focus = true;
    this.showListResult = true;
  }

  focusOut($event: any) {
    this.focus = false;
    this.showListResult = true;
  }

  selectTeam(element: any) {
    this.teamName.emit(element);
    this.searchControl.reset()
    this.placeholder = element.name? element.name : element;
    this.showListResult = false;
  }

}
