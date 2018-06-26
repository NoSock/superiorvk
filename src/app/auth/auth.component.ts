import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public path;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.path = 'https://oauth.vk.com/authorize?client_id=6615696&display=page&redirect_uri=http://example.com/callback&scope=friends&response_type=code&v=5.80';
    this.path = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }

}
