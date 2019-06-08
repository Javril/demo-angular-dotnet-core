import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '../models/IUser';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users/users.service';
import { AlertifyService } from '../services/alertify/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MemberEditResolver implements Resolve<IUser> {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
        console.log(this.authService.decodedToken.nameid);
        return this.usersService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data: ' + error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
