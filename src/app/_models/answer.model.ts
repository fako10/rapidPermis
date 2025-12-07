import {Question} from './question.model';


export class  Answer {

  id!:              number;
  attemptId!:       number;
  QuestionDto!:     Question;
  examenName!:      string;
  givenAnswer!:     string;
  correct!:         string;
}
