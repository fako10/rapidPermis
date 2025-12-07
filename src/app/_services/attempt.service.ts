import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../_models/question.model';
import {GlobalConstants} from '../_commons/global.constants';
import {Attempt} from '../_models/attempt.model';


const api = GlobalConstants.baseUrl + "attempt/usersattemps";

@Injectable({
  providedIn: 'root'
})

export class AttemptService {
  constructor(private http: HttpClient) { }

  getUserAttempts(): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${api}`);
  }

}
