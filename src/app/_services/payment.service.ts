import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../_models/question.model';
import {HttpClient} from '@angular/common/http';
import {Abonnement} from '../_models/abonnement.model';
import {GlobalConstants} from '../_commons/global.constants';
import {UserPaiementsAndAbonnements} from '../_models/userPaiementsAndAbonnements.model';
import {Payement} from '../_models/paiement.model';


const apiConnectedUserAbonnement = GlobalConstants.baseUrl + "abonnement/connected-user";
const apiConnectedUserPayment = GlobalConstants.baseUrl + "payment/connected-user";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api = 'http://localhost:8080/api/abonnement/connected-user';

  constructor(private http: HttpClient) {}

  getAbonnements(): Observable<UserPaiementsAndAbonnements> {
    return this.http.get<UserPaiementsAndAbonnements>(`${apiConnectedUserAbonnement}`);
  }

  getPayments(): Observable<Payement[]> {
    return this.http.get<Payement[]>(`${apiConnectedUserPayment}`);
  }

}
