import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Theme, THEMES} from '../_models/themes.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TokenStorageService} from '../_services/token.storage.service';
import {Utilisateur} from '../_models/utilisateur.model';

@Component({
  selector: 'app-cours',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './cours.html',
  standalone: true,
  styleUrl: './cours.css'
})
export class Cours implements OnInit{

  theme!: Theme | undefined;
  connectedUser!: Utilisateur;
  isEnabled: boolean = false;


  constructor(private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.connectedUser = this.tokenStorage.getUser();
    this.isEnabled = this.connectedUser.locked || false;
    if (!this.isEnabled) {
      // Redirection vers la route 'cours'
      this.router.navigate(['/cours']);
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.theme = THEMES.find(t => t.id === id);
    }

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
