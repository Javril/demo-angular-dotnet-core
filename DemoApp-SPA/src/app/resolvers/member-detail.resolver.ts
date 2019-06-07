import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '../models/IUser';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users/users.service';
import { AlertifyService } from '../services/alertify/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<IUser> {
    constructor(
        private usersService: UsersService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
        return this.usersService.getUser(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data: ' + error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
