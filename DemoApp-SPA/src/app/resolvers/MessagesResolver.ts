import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users/users.service';
import { AlertifyService } from '../services/alertify/alertify.service';
import { catchError } from 'rxjs/operators';
import { IMessage } from '../models/IMessage';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesResolver implements Resolve<IMessage[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IMessage[]> {
        return this.usersService.getMessages(this.authService.decodedToken.nameid,
              this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
