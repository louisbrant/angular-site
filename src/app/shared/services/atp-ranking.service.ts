import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RankingInterface} from "src/app/shared/interfaces/ranking";

@Injectable({
  providedIn: 'root'
})
export class AtpRankingService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAtpRankingTop(tab: string): Observable<RankingInterface[]> {
    return this.http.get<RankingInterface[]>(`tennis/api2/ranking/${tab}/top`)
  }
}
