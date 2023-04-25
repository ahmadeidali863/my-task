import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

  authenticate(username: string, password: string): boolean {
    if ((username === 'admin@gmail.com' && password === 'Admin' )|| username === 'User' && password === 'P@ssw0rd123') {
      console.log('login successfully')
      return true;
    } else {
      console.log('login failed')
      return false;
    }
  }
}
