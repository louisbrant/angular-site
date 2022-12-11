import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class H2HService {
  constructor(private http: HttpClient) {
  }


  public getProfilesData(type: string, playerOne: string, playerTwo: string) {
    const limit = false;
    return this.http.get<any>(`tennis/api2/h2h/profile/${type}/${playerOne}/${playerTwo}/${limit}`)
  }

  public getUpcomingMatch(type: string, playerOne: string, playerTwo: string) {
    return this.http.get<any>(`tennis/api2/h2h/upcoming/${type}/${playerOne}/${playerTwo}`);
  }

  public getH2HStats(type: string, playerOne: string, playerTwo: string, filters: any) {
    return this.http.get<any>(`tennis/api2/h2h/stats/${type}/${playerOne}/${playerTwo}`, {
      params: {
        court: filters?.court,
        round: filters?.round,
        tournament: filters?.tournament,
        level: filters?.level,
      }
    });
  }

  public getMatchesHistory(type: string, playerOne: string, playerTwo: string, filters: any, page: number) {
    return this.http.get<any>(`tennis/api2/h2h/history/${type}/${playerOne}/${playerTwo}`,
      {
        params: {
          court: filters?.court,
          round: filters?.round,
          page: page,
        }
      });
  }

  public getCurrentEventStats(type: string, player: string, player2: string) {
    return this.http.get<any>(`tennis/api2/h2h/current/${type}/${player}/${player2}`);
  }

  public getBreakDownStats(type: string, player: string, filters: any) {
    return this.http.get<any>(`tennis/api2/h2h/breakdown/${type}/${player}`, {
      params: {
        court: filters?.court,
        round: filters?.round,
        tournament: filters?.tournament,
        year: filters?.career,
      }
    });
  }

  public getRecentMatches(type: string, player: string, filters: any, page: number) {
    return this.http.get<any>(`tennis/api2/h2h/recent/${type}/${player}`,
      {
        params: {
          year: filters?.year,
          level: filters?.level,
          court: filters?.court,
          round: filters?.round,
          week: filters?.week,
          page: page,
        }
      })
  }

  public getFiltersVs(playerName1: string, playerName2: string, type: string) {
    return this.http.get(`tennis/api2/h2h/filters/${playerName1}/${playerName2}/${type}/vs`);
  }

  public getFilters(playerName1: string, playerName2: string) {
    return this.http.get(`tennis/api2/h2h/filters/${playerName1}/${playerName2}`);
  }
}
