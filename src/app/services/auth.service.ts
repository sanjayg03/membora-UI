import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  BASE_URL = ""


  constructor(private http: HttpClient, private router: Router) { }

  loggedIn() {
    return !!localStorage.getItem('userId')
  }

  getToken() {
    return localStorage.getItem('userId')
  }

  logout() {
    localStorage.removeItem('userId');
    // this.router.navigate(['/login']);
  }
}
