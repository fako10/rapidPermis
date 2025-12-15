import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Utilisateur} from '../_models/utilisateur.model';
import {GlobalConstants} from '../_commons/global.constants';
import { jwtDecode } from 'jwt-decode';
import {TokenStorageService} from './token.storage.service';


const AUTH_API = GlobalConstants.baseUrl + "auth/"
const AUTH_API_FORGET = GlobalConstants.baseUrl + "auth/forgot-password";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const USER_PASSWORD = 'password';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
    this.restoreLoginState();
  }

  restoreLoginState() {
    const token = this.tokenStorageService.getToken();

    if (token && !this.isTokenExpired()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
      this.logout(); // nettoie token expiré
    }
  }

  login(email: string | undefined, password: string, username: string | undefined): Observable<any> {

    //this.loggedIn.next(true);
    return this.http.post(AUTH_API + 'login', {
      email,
      password,
      username
    }, httpOptions);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  logout() : void {
    this.loggedIn.next(false);
  }

  isLoggedIn() {
    return this.loggedIn.value;
  }

  resetUserPassword(user: string) : Observable<any> {

    return this.http.post(AUTH_API_FORGET , user, { observe: 'response' });

  }


  generatePwd(email: string | undefined) : Observable<any> {
    return this.http.post(AUTH_API + 'changepwd', email);
  }

  registerUser(user: Utilisateur) : Observable<any> {

    return this.http.post(AUTH_API + 'register', user, { observe: 'response' });

  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  emailValidation(username: string, password: string, validationCode:string): Observable<any> {
    return this.http.post(AUTH_API + 'emailvalidation', {
      username,
      validationCode,
      password
    }, httpOptions);
  }

  public savePassword(password: string): void {
    window.sessionStorage.removeItem(USER_PASSWORD);
    window.sessionStorage.setItem(USER_PASSWORD, password);
  }

  public getPassword(): string | null {
    return window.sessionStorage.getItem(USER_PASSWORD);
  }

  isTokenExpired(): boolean {
    const token = this.tokenStorageService.getToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

}
