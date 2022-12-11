import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RankingFilter} from "src/app/pages/rankings/interfaces/ranking-filter";
import {RankingInterface} from "src/app/shared/interfaces/ranking";

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getRankingFilters(type: string): Observable<RankingFilter> {
    return this.http.get<RankingFilter>(`tennis/api2/ranking/${type}/filters`)
  }

  public getRanking(type: string, date: string, countryAcr: string, group: string, page: number) {
    return this.http.get<any>(`tennis/api2/ranking/${type}/`, {
      params: { date, countryAcr, group, page }
    })
  }
}
