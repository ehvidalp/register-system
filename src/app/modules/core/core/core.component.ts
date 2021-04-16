import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  showMenu = false;
  showMenuWildcard = false;
  userName = '';
  isMobile: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  menuItems = {
    ruv: false,
    visitorEntry: false,
    visitorEgress: false,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      this.routeActive(event.url);
    });
  }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    this.userName = `${user.FirstName} ${user.LastName}`;

    this.isMobile.subscribe((mobile) => {
      if (mobile) this.showMenu = false;
    });
  }

  routeActive(urlActive: string) {
    if (urlActive === '/ruv') {
      this.menuItems = {
        ruv: true,
        visitorEntry: false,
        visitorEgress: false,
      };
    } else if (urlActive === '/visitor-entry') {
      this.menuItems = {
        ruv: false,
        visitorEntry: true,
        visitorEgress: false,
      };
    } else if (urlActive === '/visitor-egress') {
      this.menuItems = {
        ruv: false,
        visitorEntry: false,
        visitorEgress: true,
      };
    } else {
      this.menuItems = {
        ruv: false,
        visitorEntry: false,
        visitorEgress: false,
      };
    }
  }

  closeMenu(){
    this.showMenu = (this.showMenuWildcard === true) ? true : false;
    this.showMenuWildcard = false
  }

  openMenu(){
    this.showMenuWildcard = true
  }
  goHome() {
    this.router.navigateByUrl('home');
  }

  logout() {
    this.authService.logout();
  }
}
