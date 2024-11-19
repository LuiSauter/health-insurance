import { Component, OnInit } from '@angular/core';
import { MenuService } from './../../../services/menu.service';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { environment } from '../../../../../../environments/environment';
import { Store } from '@ngxs/store';
import { IUser } from '../../../../users/interfaces';
import { GlobalState } from '../../../../../state/global';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    AngularSvgIconModule,
    NavbarMobileMenuComponent,
    NgIf
  ],
})
export class NavbarMobileComponent implements OnInit {
  public appName = environment.appName
  public user: IUser | null = null;
  constructor(public menuService: MenuService, private store: Store) { }

  ngOnInit(): void { }
  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
    this.user = this.store.selectSignal(GlobalState.getUser)()
  }
}
