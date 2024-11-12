import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkToken(): Observable<boolean> | boolean {
    return this.authService.checkToken()
      .pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) this.router.navigate(['/auth']);
          const responsiveHelper = document.getElementById('responsive-helper');
          if (responsiveHelper) {
            responsiveHelper.style.display = 'flex';
          }
          return isAuthenticated;
        })
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const responsiveHelper = document.getElementById('responsive-helper');
    if (responsiveHelper) {
      responsiveHelper.style.display = 'none';
    }
    return this.checkToken();
  }

}
