import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) { }

  ngAfterViewInit() {
    this.usernameInput.nativeElement.focus();
  }

  onLogin() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.error = 'Invalid credentials';
    }
  }
}
