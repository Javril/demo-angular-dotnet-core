import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { IUser } from 'src/app/models/IUser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users: IUser[];

  constructor(
    private usersService: UsersService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

  // loadUsers = () => {
  //   this.usersService.getUsers()
  //   .subscribe(res => {
  //     this.users = res;
  //     // this.alertify.success('Connection avec succes');
  //   }, error => {
  //       this.alertify.error(error);
  //   });
  // }

}
