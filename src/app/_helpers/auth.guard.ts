import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token.storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {

    const token = this.tokenService.getToken();

    // Si pas de token → interdit
    if (!token) {
      this.router.navigate(['/connexion']);
      return false;
    }

    // Si token expiré → déconnexion + redirection
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/connexion']);
      return false;
    }

    // OK → accès autorisé
    return true;
  }
}
