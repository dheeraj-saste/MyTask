import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable()
export class ReverseGuard {
  constructor(private router:Router){}
  canActivate(currentuser: any) {
    let valid = currentuser ?  this.router.navigate(['/mytask']) : true;
    return valid;
  }
}

export const reverseGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('accessToken') || '';
  return inject(ReverseGuard).canActivate(token);
};
