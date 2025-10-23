import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-examen-theorique',
  imports: [],
  templateUrl: './examen-theorique.html',
  standalone: true,
  styleUrl: './examen-theorique.css'
})
export class ExamenTheorique {

  constructor(
    private router: Router) {}

  gotoInscription() {
    console.log('je passe ici')
    this.router.navigateByUrl(`inscription`)
  }

}
