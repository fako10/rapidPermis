import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Utilisateur} from '../_models/utilisateur.model';
import {GlobalConstants} from '../_commons/global.constants';


const AUTH_API = GlobalConstants.baseUrl + "auth/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const USER_PASSWORD = 'password';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string | undefined, password: string): Observable<any> {
    console.log('username ' + email);
    console.log('password  ' +password);
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
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

}
