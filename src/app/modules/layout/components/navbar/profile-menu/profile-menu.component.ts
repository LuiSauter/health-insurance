import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Select, Store } from '@ngxs/store';
import { GlobalState, GlobalUserSelectors } from '../../../../../state/global';
import { Observable } from 'rxjs';
import { IUser } from '../../../../users/interfaces';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterLink, AngularSvgIconModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public profileMenu = [
    {
      title: 'Tu perfil',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/perfil',
    },
    {
      title: 'Ajustes',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: '/ajustes',
    },
    {
      title: 'Cerrar sesión',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: '/auth',
    },
  ];

  public themeColors = [
    // {
    //   name: 'base',
    //   code: '#e11d48',
    // },
    // {
    //   name: 'yellow',
    //   code: '#f59e0b',
    // },
    {
      name: 'green',
      code: '#22c55e',
    },
    // {
    //   name: 'blue',
    //   code: '#3b82f6',
    // },
    // {
    //   name: 'orange',
    //   code: '#ea580c',
    // },
    // {
    //   name: 'red',
    //   code: '#cc0022',
    // },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  user: IUser | null = null;

  constructor(
    public themeService: ThemeService,
    private store: Store
  ) {
    // this.user = this.store.selectSnapshot(GlobalUserSelectors.getUser);
  }

  ngOnInit(): void {

    this.user = this.store.selectSignal(GlobalState.getUser)()
    console.log(this.user);
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
