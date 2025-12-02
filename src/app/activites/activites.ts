import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Activite} from '../_models/activite.model';
import {QuestionService} from '../_services/question.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-activites',
  imports: [
    NgForOf
  ],
  templateUrl: './activites.html',
  standalone: true,
  styleUrl: './activites.css'
})
export class Activites implements OnInit {

  activites: Activite[] = [];
  category!: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')!;
    this.loadActivites();
  }

  loadActivites(): void {
    this.questionService.getActivitesByCategory(this.category).subscribe({
      next: (data) => {
        this.activites = data;
      },
      error: (err) => console.error('Erreur lors du chargement des activités', err)
    });
  }

  retour() {
    this.router.navigateByUrl(`preparation`);
  }
}
