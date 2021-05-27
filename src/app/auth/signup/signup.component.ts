import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.compontent.scss'],
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) return;
    this.authService.createUser(
      signupForm.value.email,
      signupForm.value.password
    );
  }
}