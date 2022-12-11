import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LiveEventInterface} from "src/app/shared/interfaces/live-event";

@Injectable({
  providedIn: 'root'
})
export class LiveEventsService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getLiveEvents(tab: string): Observable<LiveEventInterface[]> {
    return this.http.get<LiveEventInterface[]>(`tennis/api2/live-events/${tab}`)
  }
}
