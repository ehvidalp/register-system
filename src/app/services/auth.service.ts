import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SystemInformation } from '../models/system-information';
import { RuvArrays} from '../models/ruv-arrays';
import { Ruv } from '../models/ruv';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private router: Router, private http: HttpClient) {
    const user = this.getUserInfo();
    if (user != null) this.currentUserSubject.next(user as User);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value as User;
  }

  login(email: string): Observable<boolean | string> {
    return this.http
      .get<SystemInformation>(`app/SystemInformation?email=${email}`)
      .pipe(
        map((data) => {
          if (data.Error) return data.ErrorMsg;
          const user = data.Users.find((x) => {
            return x.Email === email;
          });
          this.setUserInfo(user as User);
          this.setInfoActivities(data.Activities as RuvArrays[]);
          this.setInfoCompanions(data.Companions as RuvArrays[]);
          this.currentUserSubject.next(user as User);
          return true;
        })
      );
  }

  logout(): void {
    this.destroyUserInfo();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setUserInfo(user: User) {
    localStorage.setItem('acateUser', JSON.stringify(user));
  }

  private setInfoActivities(activities: RuvArrays[]) {
    localStorage.setItem('acateActivities', JSON.stringify(activities));
  }

  private setInfoCompanions(companions: RuvArrays[]) {
    localStorage.setItem('acateCompanions', JSON.stringify(companions));
  }

  getUserInfo(): User | null {
    const user = localStorage.getItem('acateUser');
    if (user === null) return null;
    else return JSON.parse(user);
  }

  getActivitiesInfo(): User | null {
    const activies = localStorage.getItem('acateActivities');
    if (activies === null) return null;
    else return JSON.parse(activies);
  }

  getCompanionsInfo(): User | null {
    const companions = localStorage.getItem('acateCompanions');
    if (companions === null) return null;
    else return JSON.parse(companions);
  }

  private destroyUserInfo() {
    localStorage.removeItem('acateUser');
    localStorage.removeItem('acateCompanions');
    localStorage.removeItem('acateActivities');
  }
}
