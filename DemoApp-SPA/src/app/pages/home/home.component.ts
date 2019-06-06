import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.cancelRegister.subscribe((res: boolean) => {
      this.registerMode = res;
    });
  }

  registerToggle = () => {
    this.registerMode = true;
  }

}
