import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../_models/question.model';
import {GlobalConstants} from '../_commons/global.constants';
import {Activites} from '../activites/activites';
import {Activite} from '../_models/activite.model';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = GlobalConstants.baseUrl;
  private apiUrl = GlobalConstants.baseUrl + "questions";
  private saveUrl = GlobalConstants.baseUrl + "questions/save";
  private urlSaveFichier = GlobalConstants.baseUrl + "questions/saveQuestionFile";
  private urlActivites = GlobalConstants.baseUrl + "questions/activites/";
  private urlactiviteCategory = GlobalConstants.baseUrl + "activite/category/";
  private urlQuestionsByActivites = GlobalConstants.baseUrl + "activite/questions/";
  //private apiUrl = 'http://localhost:8080/api/questions';
  //private saveUrl = 'http://localhost:8080/api/questions/save';
  //private urlSaveFichier = 'http://localhost:8080/api/questions/saveQuestionFile';


  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  getQuestionsByActivite(id : number): Observable<Question[]> {
    return this.http.get<Activite[]>(`${this.urlQuestionsByActivites}${id}`);
  }

  getActivitesByCategory(category: string): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.urlActivites}${category}`);
  }

  getActiviteCategory(category: string): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.urlactiviteCategory}${category}`);
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/category/${category}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.saveUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  addPhoto(id: string,files: File []): Observable<any> {
    let uploadImageData = new FormData();
    for (let valeur of files) {
      uploadImageData.append('imageFiles', valeur, valeur.name);
    }
    return this.http.post(`${this.urlSaveFichier}/${id}`, uploadImageData, { observe: 'response' });
  }
}
