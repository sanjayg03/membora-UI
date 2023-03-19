import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['login']);
      console.log("auth guard is working...");
      console.log("this.auth.loggedIn()", this.auth.loggedIn());
      return false;
    }
    return this.auth.loggedIn();
  }

}
export { AuthService };

