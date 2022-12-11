import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchStatService {

  openPopUp = new BehaviorSubject<any>(null)

  constructor() { }

}
