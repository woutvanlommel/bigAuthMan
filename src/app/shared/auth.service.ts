import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  username = signal<string | null>(localStorage.getItem('username'));

  setUsername(name: string | null) {
    this.username.set(name);
    if (name) {
      localStorage.setItem('username', name);
    } else {
      localStorage.removeItem('username');
    }
  }
}
