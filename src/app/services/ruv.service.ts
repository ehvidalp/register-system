import { RuvArrays } from '../models/ruv-arrays';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ruv } from '../models/ruv';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { Companion } from '../models/companion';

@Injectable({
  providedIn: 'root'
})
export class RuvService {

  constructor(private http: HttpClient) { }

  create(ruv: Ruv[], activitiesArray: RuvArrays[], companionsArrays: RuvArrays[]): Observable<void> {
    let ruvId: any
    let activities: Activity[] = [];
    let companions: Companion[] = [];
    let success: boolean

    return this.http.post<void>('app/RuvForm', ruv).pipe(
      switchMap((res: any) => {
        ruvId = res[0]
        activities = this.formatDraftActivities(activitiesArray, ruvId)
        return this.http.post<void>('app/Activities' ,activities)
      }),
      switchMap((res: any) => {
        companions = this.formatDraftCompanions(companionsArrays, ruvId)
        return this.http.post<void>('app/Companions' ,companions)
      }))
  }

  formatDraftActivities(activitiesArray: RuvArrays[], ruvId: any){
    let activities: Activity[] = []
    for(let index in activitiesArray){
      activities.push({ActivityId: activitiesArray[index].Id, ServerRuvId: ruvId})
    }
    return activities
  }

  formatDraftCompanions(companionsArray: RuvArrays[], ruvId: any){
    let companions: Companion[] = []
    for(let index in companionsArray){
      companions.push({CompanionId: companionsArray[index].Id, ServerRuvId: ruvId})
    }
    return companions
  }

}
