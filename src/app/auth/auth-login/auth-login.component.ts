import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthTransportService} from '../auth-transport/auth-transport.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.less']
})
export class AuthLoginComponent implements OnInit {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private auth: AuthTransportService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.form.value);
    this.subscriptions.push(
      this.auth.login(this.form.value.login, this.form.value.password)
        .subscribe(response => {
          console.log(response);
          this.router.navigateByUrl('');
        })
    );
  }

}
