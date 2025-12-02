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
import {Success} from './success/success';
import {Activites} from './activites/activites';
import {Tarifs} from './tarifs/tarifs';
import {Cours} from './cours/cours';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },
  { path: 'quiz/activite/:id', component: Quiz },
  { path: 'question-admin', component: QuestionAdmin },
  { path: 'examen', component: Examen },
  { path: 'preparation', component: PreparationTheorie },
  { path: 'mon-compte', component: MonCompte },
  { path: 'cours', component: ExamenTheorique },
  { path: 'activites/:category', component: Activites },
  { path: 'tarifs', component: Tarifs },
  { path: 'cours/theme/:id', component: Cours },
  { path: 'success', component: Success }
];
