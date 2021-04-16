import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let baseUri = environment.baseUri;
    let url: string = '';
    let reqHeader: { [key: string]: string } = {};

    const currentUser = this.authService.currentUserValue;

    if (!baseUri.endsWith('/')) baseUri = `${baseUri}/`;

    if (!request.url.startsWith('http') || !request.url.startsWith('https'))
      url = `${baseUri}${request.url}`;

    // if (currentUser && currentUser.token) {
    //   reqHeader.Authorization = `Bearer ${currentUser.token}`;
    //   reqHeader.Who = currentUser.email;
    // }

    request = request.clone({ url: url, setHeaders: reqHeader });

    return next.handle(request).pipe(retry(2));
  }
}
