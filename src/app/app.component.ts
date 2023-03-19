import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.guard';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'membora-ui';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private auth: AuthService
  ) { }


  loggedIn: any;

  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


}
