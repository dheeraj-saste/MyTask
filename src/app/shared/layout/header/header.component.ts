import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router){}
  clear() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
}
}
