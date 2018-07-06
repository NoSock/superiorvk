import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceValidator, repeatValidator, updateValidator} from '../auth-validators/auth-validators';
import {AuthTransportService} from '../auth-transport/auth-transport.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.less']
})
export class AuthRegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthTransportService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, updateValidator('confirm')]],
      confirm: ['', Validators.required, debounceValidator(repeatValidator('password'), 500)],
    });
  }

  register() {
    console.log(this.form.value);
    this.auth.register(this.form.value.login, this.form.value.password)
      .subscribe(response => {
        console.log(response);
        if (response.auth) {
          this.router.navigateByUrl('');
        }
      });
  }
}
