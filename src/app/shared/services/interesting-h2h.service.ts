import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PlayerInterface} from 'src/app/shared/interfaces/player';

export interface InterestingH2hInterface {
  player1: PlayerInterface;
  player2: PlayerInterface;
  player1Wins: number;
  player2Wins: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterestingH2hService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getInterestingH2h(type: string): Observable<InterestingH2hInterface[]> {
    return this.http.get<InterestingH2hInterface[]>(`tennis/api2/interesting-h2h/${type}`)
  }
}
