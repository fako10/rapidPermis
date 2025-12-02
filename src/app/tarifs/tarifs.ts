import { Component } from '@angular/core';
import {formatDate} from '@angular/common';
import {GlobalConstants} from '../_commons/global.constants';
import {CheckoutService} from '../_services/checkout.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tarifs',
  imports: [],
  templateUrl: './tarifs.html',
  styleUrl: './tarifs.css'
})
export class Tarifs {


  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private router: Router) {
  }

  pay(libelle: string, amount: number) {

    if (this.authService.isTokenExpired()) {
      this.router.navigateByUrl(`connexion`)
    } else {
      var tt = Math.floor(1000 + Math.random() * 9000);
      var today = new Date();
      var tte = formatDate(today, 'MM/dd/yyyy', "en-US");
      var code = tt.toString() + '-' + tte;
      window.sessionStorage.setItem(GlobalConstants.libellecertification, 'theorie');
      window.sessionStorage.setItem(GlobalConstants.libellepaiement, libelle);
      window.sessionStorage.setItem(GlobalConstants.amount, amount.toString());
      window.sessionStorage.setItem(GlobalConstants.codepaiement, code);


      this.checkoutService.checkout(amount); // 19,99 €
    }
  }
}
