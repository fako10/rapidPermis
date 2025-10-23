import { Component, signal } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Utilisateur} from './_models/utilisateur.model';
import {TokenStorageService} from './_services/token.storage.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rapidPermis');

  isLoggedIn = false;
  username?: string;
  connectedUser!: Utilisateur;

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService
              ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;
      this.connectedUser = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  gotoConnexion() {
    this.router.navigateByUrl(`connexion`);

  }

  gotoPreparation() {
    this.router.navigateByUrl(`preparation`);
  }

  goToAccount() {
    this.router.navigateByUrl(`preparation`);
  }

  goToMonCompte() {
    this.router.navigateByUrl(`mon-compte`);
  }
}
