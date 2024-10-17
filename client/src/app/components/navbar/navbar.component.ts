import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterLink, 
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Успішний вихід', 'Закрити', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  };
}
