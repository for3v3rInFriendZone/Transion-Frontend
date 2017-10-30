import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenService implements HttpInterceptor{

  constructor(private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const clonedRequest = request.clone({
      headers:
        request.headers.set('Authorization', this.auth.token)
        .set('Access-Control-Allow-Origin', 'http://127.0.0.1:4200')
      
    });
    return next.handle(clonedRequest);
  }

}
