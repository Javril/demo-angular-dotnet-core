import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    if (!this.user.photoUrl) {
      this.user.photoUrl = this.user.gender ===
      'male' ? '../../assets/male.png' : '../../assets/female.png';
    }
    // console.log(this.user.photoUrl);
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

}
