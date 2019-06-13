import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit() {
    if (!this.user.photoUrl) {
      this.user.photoUrl = this.user.gender ===
      'male' ? '../../assets/male.png' : '../../assets/female.png';
    }
    // console.log(this.user.photoUrl);
  }

}
