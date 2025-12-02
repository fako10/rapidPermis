import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CheckoutService} from '../_services/checkout.service';
import {loadStripe} from '@stripe/stripe-js';
import {GlobalConstants} from '../_commons/global.constants';
import {formatDate} from '@angular/common';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-examen-theorique',
  imports: [RouterModule ],
  templateUrl: './examen-theorique.html',
  standalone: true,
  styleUrl: './examen-theorique.css'
})
export class ExamenTheorique {

  stripePromise = loadStripe('pk_live_51OW90nCxzoszcrHkPVt8oF53SqI5kGTTU6XrK114pzu4xfZUjF435SvW6lO260NwXC09tAIOzKLcYiritRDF09NG00PwnAFFVS');

  constructor(
    private checkoutService : CheckoutService,
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
