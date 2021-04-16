import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMsg: string = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errorMsg = '';
    if (!this.email.valid) {
      this.email.markAsTouched();
      return;
    }

    this.loading = true

    this.authService.login(this.email.value).subscribe((res) => {
      if (typeof res === 'boolean') this.router.navigateByUrl('home');
      else {
        this.errorMsg = res;
      }
      this.loading = false
    });

    //
  }
}
