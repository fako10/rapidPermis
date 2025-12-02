// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token.storage.service';
import {Utilisateur} from '../_models/utilisateur.model';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-connexion',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './connexion.html',
  standalone: true,
  styleUrl: './connexion.css'
})
export class Connexion implements OnInit {

  email = '';
  password = '';
  message = '';
  utilisateur!: Utilisateur;
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  successfullMessage = '';

  showForgot = false;
  forgotEmail = '';
  forgotMsg = '';
  emailInvalid = true;


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.utilisateur = new Utilisateur();

  }

  onSubmit() {
    this.utilisateur.username = this.utilisateur.email;
    this.authService.login(this.utilisateur.username, this.utilisateur.password).subscribe({
      complete: () => {

      },
      next: (value) => {
        this.tokenStorage.saveToken(value.data.accessToken);
        this.tokenStorage.saveUser(value);
        this.authService.setLoggedIn(true);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.errorMessage = '';
        this.successfullMessage = 'Connexion reussie';

        this.router.navigateByUrl(`preparation`);
      },
      error: (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  }

  toggleForgot() {
    this.showForgot = !this.showForgot;
    this.forgotMsg = '';
  }

  sendForgot() {
    if (!this.forgotEmail) {
      this.forgotMsg = "Veuillez entrer un email.";
      return;
    }

    this.authService.resetUserPassword(this.forgotEmail).subscribe({
      next: (res: any) => {
        this.forgotMsg = res.message;
      },
      error: () => {
        this.forgotMsg = "Email introuvable.";
      }
    });
  }

  validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !regex.test(this.forgotEmail);
  }
}
