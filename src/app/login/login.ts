// src/app/login/login.ts
import { Component, inject } from '@angular/core';
import { UserService } from '../shared/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
  username!: string;
  password!: string;


private userService = inject(UserService);
private router = inject(Router);
private auth = inject(AuthService);

constructor() { }

  async onSubmit() {
    if (!this.username || !this.password) {
      alert('Vul gebruikersnaam en wachtwoord in');
      return;
    }
    const token = await this.userService.login(this.username, this.password);
    if (token) {
      localStorage.setItem('token', token);
      this.auth.setUsername(this.username);

      // Get the redirect URL from localStorage
      const redirectUrl = localStorage.getItem('redirectUrl') || '/';
      localStorage.removeItem('redirectUrl'); // Clean up

      // Navigate to the protected route or home
      this.router.navigate([redirectUrl]);
    } else {
      alert('Invalid username or password');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.auth.setUsername(null);
    alert('You have been logged out');
    this.router.navigate(['/login']);
  }
}