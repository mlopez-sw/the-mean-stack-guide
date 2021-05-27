import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authListenerSubs: Subscription;
  userAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getAuthenticationStatus();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
