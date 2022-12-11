import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { timer } from "rxjs";
import { debounce, take, tap } from "rxjs/operators";

@Component({
  selector: '[searchInput]',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() size: 'short' | 'medium' = 'medium'
  @Input() showBorder = false
  @Input() listResult: string[] = []

  @Input() modalTemplate!: TemplateRef<any>;
  @Input() name: string = ''
  @Input() type: string = ''

  @Input() isDebounce: boolean = false;
  @Input() debounceTime: number = 1500;

  @Output() control: EventEmitter<FormControl> = new EventEmitter<FormControl>()

  @Output() eventSubmit = new EventEmitter()
  @Input() placeholder: string = "";
  public showListResult: boolean = false;
  public focus = false;
  public searchControl: FormControl = new FormControl('');
  public placeholdertext = this.placeholder;
  constructor() {
  }

  ngOnInit(): void {
    if (this.isDebounce) {
      this.searchControl.valueChanges.pipe(
        tap(v => {
          this.listResult = []
        }),
        debounce(() => timer(this.debounceTime))
      ).subscribe(result => {
        this.search();
      })
    }
  }

  search() {
    this.eventSubmit.emit(this.searchControl.value)
  }

  focusIn($event: FocusEvent) {
    this.focus = true;
    this.showListResult = true;
  }

  focusOut($event: any) {
    this.focus = false;
    // if (!this.searchParent($event.explicitOriginalTarget)) this.showListResult = false;
  }

  // searchParent(element: any): boolean {
  //   if (element.id == 'search') {
  //     return true;
  //   }
  //   if (element?.parentElement != null) {
  //     return this.searchParent(element.parentElement)
  //   }
  //   return false;
  // }

  h2hLink(element: string) {
    return `/tennis/h2h/${this.type}/${element}/${this.name}`
  }
}
