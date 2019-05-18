import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any) {
    const usersService = this.injector.get(UsersService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${usersService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
