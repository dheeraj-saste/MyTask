import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



@Injectable()
export class AuthGuard{
  constructor(private router: Router) {}
  canActivate(currentuser: any) {
    
    let valid = currentuser ? true: this.router.navigate(['auth/login'])
    // if (currentuser) {
    //   return true;
    // }
    // else {
    //   return false
    // }
    return valid
  }
}



export const authenticateGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('accessToken')
  return inject(AuthGuard).canActivate(token);
  
};
