import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  constructor(private http: HttpClient) {
  }

  public getElasticSearch(search: string): Observable<any> {
    return this.http.get(`/tennis/api2/search/${search}`)
  }

  public getSearchByCategory(search: string, category: string): Observable<any> {
    return this.http.get(`/tennis/api2/search/${search}/${category}`)
  }
}
