import { Component } from '@angular/core';
import {Category} from '../_models/category.model';
import {Examen} from '../_models/examen.model';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-preparation-theorie',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './preparation-theorie.html',
  standalone: true,
  styleUrl: './preparation-theorie.css'
})
export class PreparationTheorie {


  mode: 'training' | 'simulation' | null = null;

  categories: Category[] = [
    { id: 1, name: 'Panneaux', icon: '🚦' },
    { id: 2, name: 'Priorités', icon: '🚗' },
    { id: 3, name: 'Écoconduite', icon: '🌱' },
    { id: 4, name: 'Signalisation', icon: '⚙️' },
    { id: 5, name: 'Règles générales', icon: '📘' },
    { id: 6, name: 'Stationnement', icon: '🅿️' },
    { id: 7, name: 'Sécurité', icon: '🦺' },
    { id: 8, name: 'Premiers secours', icon: '⛑️' },
    { id: 9, name: 'Mécanique', icon: '🔧' },
    { id: 10, name: 'Conduite écologique', icon: '🌍' },
  ];

  simulations: Examen[] = [
    { id: 1, title: 'Examen blanc 1', questions: 20, duration: 15 },
    { id: 2, title: 'Examen blanc 2', questions: 30, duration: 20 },
  ];

  selectMode(mode: 'training' | 'simulation') {
    this.mode = mode;
  }

  startCategory(cat: Category) {
    console.log('Catégorie choisie :', cat);
    // navigation ex: this.router.navigate(['/training', cat.id]);
  }

  startSimulation(sim: Examen) {
    console.log('Simulation choisie :', sim);
    // navigation ex: this.router.navigate(['/exam', sim.id]);
  }

}


