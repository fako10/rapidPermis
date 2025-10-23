import { Routes } from '@angular/router';
import {Accueil} from './accueil/accueil';
import {ExamenTheorique} from './examen-theorique/examen-theorique';
import {Inscription} from './inscription/inscription';
import {Connexion} from './connexion/connexion';
import {Quiz} from './quiz/quiz';
import {QuestionAdmin} from './question-admin/question-admin';
import {Examen} from './examen/examen';
import {PreparationTheorie} from './preparation-theorie/preparation-theorie';
import {MonCompte} from './mon-compte/mon-compte';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },
  { path: 'quiz/:category', component: Quiz },
  { path: 'question-admin', component: QuestionAdmin },
  { path: 'examen', component: Examen },
  { path: 'preparation', component: PreparationTheorie },
  { path: 'mon-compte', component: MonCompte },
  { path: 'examen-theorique', component: ExamenTheorique }
];
