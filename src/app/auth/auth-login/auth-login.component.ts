import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthTransportService} from '../auth-transport/auth-transport.service';
import {Subscription} from 'rxjs';
import { Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.less']
})
export class AuthLoginComponent implements OnInit {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  vkAuthUrl: SafeResourceUrl;

  private hashParams() {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    const params = fragment && fragment.split('&')
      .reduce((acc, pair) => {
        const keyValue = pair.split('=')
          .map(decodeURIComponent);
        acc[keyValue[0]] = keyValue[1];
        return acc;
      }, {});
    return params || {};
  }

  constructor(private formBuilder: FormBuilder,
              private auth: AuthTransportService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.vkAuthUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl(this.auth.vkAuthUrl);
  }

  login() {

      this.auth.login(this.form.value.login, this.form.value.password)
        .subscribe((val) => {
          this.router.navigateByUrl('/');
        });
  }
}
