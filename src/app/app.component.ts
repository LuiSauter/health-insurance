import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { CommonModule, NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgClass, ResponsiveHelperComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = environment.appName;

  constructor(public themeService: ThemeService) {}
}
