import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/AuthService';
import {first} from 'rxjs';
import {validateWorkspace} from '@angular/cli/src/utilities/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // اگر کاربر قبلا لاگین کرده باشد به صفحه اصلی هدایت می‌شود
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required] , [Validators.pattern(/^09\d{9}$/)]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnInit(): void {
  }

  // دسترسی راحت به فیلدهای فرم
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login({PhoneNumber: this.f['username'].value, Password: this.f['password'].value})
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]).then(r => {
          });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

}
