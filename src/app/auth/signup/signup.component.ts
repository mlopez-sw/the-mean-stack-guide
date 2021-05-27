import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.compontent.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) return;
    this.authService.createUser(
      signupForm.value.email,
      signupForm.value.password
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
