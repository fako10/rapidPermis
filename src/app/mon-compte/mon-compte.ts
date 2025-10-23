import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgSwitch} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Utilisateur} from '../_models/utilisateur.model';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token.storage.service';
import {Abonnement} from '../_models/abonnement.model';
import {Payement} from '../_models/payment.model';
import {ExamenService} from '../_services/examen.service';
import {PaymentService} from '../_services/payment.service';
import {UserPaiementsAndAbonnements} from '../_models/userPaiementsAndAbonnements.model';

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

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private PaymentService: PaymentService
  ) { }

  ngOnInit() {
    this.connectedUser = this.tokenStorageService.getUser();
    this.selectedSection = this.menuItems[0].id;
    this.PaymentService.getAbonnements().subscribe({
      next: res => {
        this.abonnements = res.abonnements;
        this.paiements = res.payements;
      },
      error: err => console.error('Erreur submit', err)
    });

  }

  selectedSection = 'dashboard';

  menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'fas fa-home' },
    { id: 'payments', label: 'Paiements', icon: 'fas fa-credit-card' },
    { id: 'subscriptions', label: 'Abonnements', icon: 'fas fa-calendar-alt' },
    { id: 'logout', label: 'Déconnexion', icon: 'fas fa-sign-out-alt' },
  ];

  selectSection(sectionId: string) {
    console.log(sectionId);
    this.selectedSection = sectionId;
  }

}
