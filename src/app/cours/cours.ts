import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Theme, THEMES} from '../_models/themes.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cours',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './cours.html',
  standalone: true,
  styleUrl: './cours.css'
})
export class Cours implements OnInit{

  theme!: Theme | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.theme = THEMES.find(t => t.id === id);
  }

  checkAnswer(qIndex: number, selectedIndex: number) {
    if (!this.theme) return;
    const q = this.theme.qcm[qIndex];
    if (q.answer === selectedIndex) {
      alert('Bonne réponse ! ✅');
    } else {
      alert('Mauvaise réponse ❌');
    }
  }

}
