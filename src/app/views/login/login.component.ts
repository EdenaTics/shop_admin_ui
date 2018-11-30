import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {Token} from '../../bean/Token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasError = false;
  messError: string;
  registerForm: FormGroup;

  constructor(private acountService: AccountService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hasError = false;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  get f() { return this.registerForm.controls; }

  login(loginForm) {
    console.log(loginForm);
    if (this.registerForm.invalid) {
      this.hasError = true;
      if (this.f.username.errors) {
        this.messError = 'Username required';
      } else if (this.f.password.errors && this.f.password.errors.minlength) {
        this.messError = 'Password must be at least 4 characters';
      } else if (this.f.password.errors && this.f.password.errors.required) {
        this.messError = 'Password required';
      }
      return;
    }
    this.acountService.authent(loginForm).subscribe(
      result => {
        this.hasError = false;
        loginForm = result as Token;
        console.log(result);
        this.acountService.manageResult(loginForm);
        this.route.navigateByUrl('/dashboard');
      },
      error => {
        console.log(error.error);
        this.hasError = true;
        this.messError = error.error.error;
        // sconsole.log(error.error);
      }
    );
  }

}
