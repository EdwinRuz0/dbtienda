import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda';
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const currentUrl = this.router.url;
    const token = localStorage.getItem('authToken');

    return !!token && currentUrl !== '/' && currentUrl !== '/register';
  }
  
}
