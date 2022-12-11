import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SearchInterface} from "../interfaces/search.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamSearchService {
  private readonly api: string = environment.footballApiUrl;

  constructor(private http: HttpClient) { }

  search(name: string, isTeam?: boolean): Observable<SearchInterface[]> {
    return this.http.post<SearchInterface[]>(`${this.api}/search`, {name, isTeam})
  }
}
