import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  success: boolean | undefined

  private toastr = new BehaviorSubject<any>({})
  isSuccess$ = this.toastr.asObservable()

  constructor() { }

  setSuccess(success: boolean | undefined) {
    this.success = success
    this.toastr.next(this.success)
  }
}
