import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token.storage.service';
import {Utilisateur} from '../_models/utilisateur.model';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Abonnement} from '../_models/abonnement.model';
import {Payement} from '../_models/payment.model';

@Component({
  selector: 'app-connexion',
  imports: [
    FormsModule,
    NgIf
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


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();

  }

  onSubmit() {
    console.log(this.utilisateur);
    this.utilisateur.username = this.utilisateur.email;
    this.authService.login(this.utilisateur.username, this.utilisateur.password).subscribe({
      complete: () => {

      },
      next: (value) => {
        console.log('values ' + value.data.accessToken);
        console.log(value.accessToken)
        this.tokenStorage.saveToken(value.data.accessToken);
        this.tokenStorage.saveUser(value);
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
}
