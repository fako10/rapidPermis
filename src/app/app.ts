import {Component, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {Utilisateur} from './_models/utilisateur.model';
import {TokenStorageService} from './_services/token.storage.service';
import {CommonModule} from '@angular/common';
import {AuthService} from './_services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements  OnInit{
  protected readonly title = signal('rapidPermis');

  isLoggedIn = false;
  username?: string;
  connectedUser!: Utilisateur;
  showNavbar = true;


  ngOnInit() {

    this.authService.loggedIn$.subscribe(value => {
      this.isLoggedIn = value;
      this.connectedUser = this.tokenStorageService.getUser();
    });
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem('token');
      //this.router.navigate(['/connexion']);
    }



  }

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService
              ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = [
          '/examen',
          '/free-test',
          '/quiz'
        ];

        this.showNavbar = !hiddenRoutes.some(route =>
          event.url.includes(route)
        );
      }
    });


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

  gotoAccueil() {
    this.router.navigateByUrl(`accueil`);
  }

  gotoPreparation() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log('isloggedIn ' + this.isLoggedIn);
    if (this.isLoggedIn) {
      this.router.navigateByUrl(`preparation`);
    } else  {
      this.router.navigateByUrl(`connexion`);
    }
  }

  goToAccount() {
    this.router.navigateByUrl(`preparation`);
  }

  goToMonCompte() {
    this.router.navigateByUrl(`mon-compte`);
  }
}
