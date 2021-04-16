import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisitorGroup } from '../models/visitor-group';

@Injectable({
  providedIn: 'root'
})
export class VisitorEntryService {

  constructor(
    private http: HttpClient
  ) { }

  create(visitorGroup: VisitorGroup[]): Observable<void>{
    return this.http.post<void>('app/Groups', visitorGroup)
  }

}
