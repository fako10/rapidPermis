import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CheckoutService} from '../_services/checkout.service';
import {loadStripe} from '@stripe/stripe-js';
import {GlobalConstants} from '../_commons/global.constants';
import {formatDate, NgClass, NgForOf} from '@angular/common';
import {AuthService} from '../_services/auth.service';
import {ThemeCard, THEMES} from '../_models/themes.model';
import {Utilisateur} from '../_models/utilisateur.model';
import {TokenStorageService} from '../_services/token.storage.service';

@Component({
  selector: 'app-examen-theorique',
  imports: [RouterModule, NgClass, NgForOf],
  templateUrl: './examen-theorique.html',
  standalone: true,
  styleUrl: './examen-theorique.css'
})



export class ExamenTheorique implements OnInit {

  stripePromise = loadStripe('pk_live_51OW90nCxzoszcrHkPVt8oF53SqI5kGTTU6XrK114pzu4xfZUjF435SvW6lO260NwXC09tAIOzKLcYiritRDF09NG00PwnAFFVS');
  isEnabled: boolean = false;
  connectedUser!: Utilisateur;

  themes: ThemeCard[] = [
    {
      id: 1,
      title: 'Thème 1',
      description: 'La circulation routière',
      enabled: true
    },
    {
      id: 2,
      title: 'Thème 2',
      description: 'Le conducteur',
      enabled: true
    },
    {
      id: 3,
      title: 'Thème 3',
      description: 'La route',
      enabled: true
    },
    {
      id: 4,
      title: 'Thème 4',
      description: 'Les autres usagers',
      enabled: false // 👈 verrouillé
    },
    {
      id: 5,
      title: 'Thème 5',
      description: 'Réglementation générale',
      enabled: true
    },
    {
      id: 6,
      title: 'Thème 6',
      description: 'Les premiers secours',
      enabled: true
    },
    {
      id: 7,
      title: 'Thème 7',
      description: 'Prendre et quitter son véhicule',
      enabled: true
    },
    {
      id: 8,
      title: 'Thème 8',
      description: 'La mécanique et l’entretien',
      enabled: true
    },
    {
      id: 9,
      title: 'Thème 9',
      description: 'Sécurité conducteur & routière',
      enabled: true
    },
    {
      id: 10,
      title: 'Thème 10',
      description: 'Environnement',
      enabled: true
    }
  ];

  ngOnInit(): void {
    this.connectedUser = this.tokenStorage.getUser();
    this.isEnabled = this.connectedUser.locked || false;

  }

  constructor(
    private checkoutService : CheckoutService,
    private tokenStorage: TokenStorageService,
    private authService : AuthService,
    private router: Router) {}

  gotoInscription() {
    this.router.navigateByUrl(`inscription`)
  }

  pay(libelle: string, amount : number) {

    if(this.authService.isTokenExpired()) {
      this.router.navigateByUrl(`connexion`)
    } else {
      var tt = Math.floor(1000 + Math.random() * 9000);
      var today = new Date();
      var tte = formatDate(today,'MM/dd/yyyy', "en-US");
      var code = tt.toString()+'-' + tte;
      window.sessionStorage.setItem(GlobalConstants.libellecertification, 'theorie');
      window.sessionStorage.setItem(GlobalConstants.libellepaiement, libelle);
      window.sessionStorage.setItem(GlobalConstants.amount, amount.toString());
      window.sessionStorage.setItem(GlobalConstants.codepaiement, code);


      this.checkoutService.checkout(amount); // 19,99 €
    }

  }







}
