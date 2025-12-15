import {Question} from './question.model';


export class  Answer {

  id!:              number;
  attemptId!:       number;
  question!:     Question;
  examenName!:      string;
  givenAnswer!:     string;
  correct!:         string;
}
