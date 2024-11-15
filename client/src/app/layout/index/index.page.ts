import { Component, OnInit } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/types/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  
})
export class IndexPage implements OnInit {

  user: IUser | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

}
