import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  hidemenu: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Current Page:', event.url);
        this.availableSideMenuPage(event.url);
      }
    });
  }
  availableSideMenuPage(pageurlname: string): void {
    switch (pageurlname) {
      case '/':
        this.hidemenu = true;
        break;
      case '/login':
        this.hidemenu = true;
        break;
      case '/register':
        this.hidemenu = true;
        break;
      default:
        this.hidemenu = false;
        break;
    }
  }
}
