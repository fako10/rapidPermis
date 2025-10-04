import { Routes } from '@angular/router';
import {Accueil} from './accueil/accueil';
import {ExamenTheorique} from './examen-theorique/examen-theorique';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'examen-theorique', component: ExamenTheorique }
];
