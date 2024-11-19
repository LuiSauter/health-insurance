import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { Theme } from '../../../../core/models/theme.model';
import { environment } from '../../../../../environments/environment';
import { Store } from '@ngxs/store';
import { IUser } from '../../../users/interfaces';
import { GlobalState } from '../../../../state/global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AngularSvgIconModule, SidebarMenuComponent, RouterLink],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;
  public appName = environment.appName
  public user: IUser | null = null;
  constructor(public menuService: MenuService, private store: Store) { }

  ngOnInit(): void {
    this.user = this.store.selectSignal(GlobalState.getUser)()
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
