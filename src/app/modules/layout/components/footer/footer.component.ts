import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent implements OnInit {
  public appName = environment.appName
  public year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }
}
