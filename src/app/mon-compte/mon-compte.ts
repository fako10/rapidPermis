import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgSwitch} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Utilisateur} from '../_models/utilisateur.model';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token.storage.service';
import {Abonnement} from '../_models/abonnement.model';
import {PaymentService} from '../_services/payment.service';
import {UserPaiementsAndAbonnements} from '../_models/userPaiementsAndAbonnements.model';
import {Payement} from '../_models/paiement.model';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-mon-compte',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './mon-compte.html',
  standalone: true,
  styleUrl: './mon-compte.css',

})
export class MonCompte implements OnInit {

  connectedUser!: Utilisateur;
  abonnements: Abonnement[] = [];
  payments: Payement[] = [];

  paiements : Payement[] = [];
  userPaiementsAndAbonnements!: UserPaiementsAndAbonnements;
  isLoggedIn = false;

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private PaymentService: PaymentService,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      this.connectedUser = this.tokenStorageService.getUser();
      this.selectedSection = this.menuItems[0].id;
      this.PaymentService.getAbonnements().subscribe({
        next: res => {
          this.abonnements = res.abonnements;
          this.paiements = res.payements;
        },
        error: err => console.error('Erreur submit', err)
      });
    } else {
      this.router.navigateByUrl(`connexion`);
    }



  }

  selectedSection = 'dashboard';

  menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'fas fa-home' },
    { id: 'payments', label: 'Paiements', icon: 'fas fa-credit-card' },
    { id: 'subscriptions', label: 'Abonnements', icon: 'fas fa-calendar-alt' },
    { id: 'logout', label: 'Déconnexion', icon: 'fas fa-sign-out-alt' },
  ];

  selectSection(sectionId: string) {
    this.selectedSection = sectionId;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.authService.logout();
    window.location.reload();
  }

}
