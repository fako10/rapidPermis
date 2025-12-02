import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from '../_commons/global.constants';
import {CheckoutService} from '../_services/checkout.service';
import {Payement} from '../_models/paiement.model';


@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  standalone: true,
  styleUrl: './success.css'
})
export class Success implements OnInit {

  paiement!: Payement;
  constructor(private checkoutService : CheckoutService) { }



  ngOnInit(): void {
    var libelle = window.sessionStorage.getItem(GlobalConstants.libellepaiement);
    var libelleCertification = window.sessionStorage.getItem(GlobalConstants.libellecertification);
    var amount = window.sessionStorage.getItem(GlobalConstants.amount) || '0';
    var code = window.sessionStorage.getItem(GlobalConstants.codepaiement) || '';
    var payment = new Payement();
    payment.certificationId = 3;
    payment.libelle = libelle  || '';
    payment.currency = 'eur';
    payment.amount = +amount;
    payment.quantity = 1;
    payment.cancelUrl = 'http://localhost:4200/cancel';
    payment.cancelUrl = 'http://localhost:4200/success';
    payment.code = code;


    this.checkoutService.registerPayement(payment)
      .subscribe(
        data => {
          this.paiement = data;
        },
        error => {
          console.log(error);
        });


  }
}
