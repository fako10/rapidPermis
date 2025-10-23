import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../_models/question.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExamenService {
  private api = 'http://localhost:8080/api/exams';

  constructor(private http: HttpClient) {}

  startTraining(category: string, count: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.api}/starttraining?category=${category}&count=${count}`);
  }

  startExam(examenId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.api}/startexamen?examenId=${examenId}`);
  }

  submitAttempt(payload: any) {
    return this.http.post(`${this.api}/submit`, payload);
  }
}
