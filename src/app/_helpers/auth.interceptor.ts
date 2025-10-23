// auth.interceptor.ts
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import {TokenStorageService} from '../_services/token.storage.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const tokenService = inject(TokenStorageService);
  const token = tokenService.getToken();


  console.log('interceptor');
  console.log(token);

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(authReq);

    return next(authReq);
  }



  return next(req); // passe la requête clonée au handler
};
