import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  users: IUser[];

  constructor(
    private usersService: UsersService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.usersService.getUsers()
    .subscribe(res => {
      this.users = res;
      this.alertify.success('Connection avec succes');
    }, error => {
        this.alertify.error(error);
    });
  }

}
