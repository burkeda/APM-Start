import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

/*
  Since the guard is a service it needs to be registered with an injecter.

  The CLI registers this injector with the root app injector using the
  providedIn property.

  Use route guards anytime you want to:
	  1. prevent access to a route
	  2. Confirm nav away from a route
    3. Pre-load data for a route
    // tslint:disable-next-line:no-trailing-whitespace

*/

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot, //  provides current route info
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // tslint:disable-next-line:prefer-const
    let id = +next.url[1].path;   // id from path.  + converts to a number

    if (isNaN(id) || id < 1) {
      alert('Invalid product id');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
