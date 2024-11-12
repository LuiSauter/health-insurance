import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, RouterOutlet],
})
export class AuthComponent implements OnInit {
  appName = environment.appName;
  constructor() { }

  ngOnInit(): void { }
}
