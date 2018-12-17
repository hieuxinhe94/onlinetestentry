import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const idToken = localStorage.getItem("currentToken");
    const headers = new HttpHeaders().set('content-type', 'application/json');
    
    request = request.clone({
      setHeaders: {
        Authorization: ("Bearer " + idToken) ,
        'content-type': 'application/json'
      }
    });
    return next.handle(request);
  }
}