import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../_models/question.model';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../_commons/global.constants';

const api = GlobalConstants.baseUrl + "exams";

@Injectable({providedIn: 'root'})
export class ExamenService {
  //private api = 'http://localhost:8080/api/exams';

  constructor(private http: HttpClient) {}

  startTraining(category: string, count: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${api}/starttraining?category=${category}&count=${count}`);
  }

  startExam(examenId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${api}/startexamen?examenId=${examenId}`);
  }

  submitAttempt(payload: any) {
    return this.http.post(`${api}/submit`, payload);
  }
}
