import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject, timer} from "rxjs";
import {debounce, take, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-search-input-header',
  templateUrl: './search-input-header.component.html',
  styleUrls: ['./search-input-header.component.scss']
})
export class SearchInputHeaderComponent implements OnInit, OnDestroy {

  @Input() size: 'short' | 'medium' = 'medium'
  @Input() showBorder = false
  @Input() listResult: any[] = []

  @Input() modalTemplate!: TemplateRef<any>;
  @Input() name: string = ''

  @Input() isDebounce: boolean = false;
  @Input() debounceTime: number = 300;

  @Output() control: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  @Output() eventSubmit = new EventEmitter()

  public showListResult: boolean = false;
  public focus = false;
  public searchControl: FormControl = new FormControl('');
  protected unSubscribe: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    if (this.isDebounce) {
      this.searchControl.valueChanges.pipe(
        tap(v => {
          this.listResult = []
        }),
        debounce(() => timer(this.debounceTime))
      ).pipe(takeUntil(this.unSubscribe))
        .subscribe(result => {
        this.search()
      })
    }
  }

  search() {
    this.eventSubmit.emit(this.searchControl.value.toLowerCase())
  }

  focusIn($event: FocusEvent) {
    this.focus = true;
    this.showListResult = true;
  }

  focusOut($event: any) {
    this.focus = false;
  }

  public getYear(date: string) {
    return new Date(date).getFullYear()
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
