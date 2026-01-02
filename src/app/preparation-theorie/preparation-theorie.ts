import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from '../_models/category.model';
import {Examen} from '../_models/examen.model';
import {formatDate, NgClass, NgForOf, NgIf} from '@angular/common';
import {Utilisateur} from '../_models/utilisateur.model';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token.storage.service';
import {Router} from '@angular/router';
import {GlobalConstants} from '../_commons/global.constants';
import {CheckoutService} from '../_services/checkout.service';
import {Activite} from '../_models/activite.model';
import {QuestionService} from '../_services/question.service';
import {Attempt} from '../_models/attempt.model';
import {AttemptService} from '../_services/attempt.service';
import {Question} from '../_models/question.model';


@Component({
  selector: 'app-preparation-theorie',
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './preparation-theorie.html',
  standalone: true,
  styleUrl: './preparation-theorie.css'
})
export class PreparationTheorie implements OnInit {


  mode: 'training' | 'simulation' | 'payment' | null = null;
  connectedUser!: Utilisateur;
  isEnabled: boolean = false;

  activites: Activite[] = [];
  loading = false;
  error: string | null = null;
  categorieCourante!: Category;
  popupVisible = false;
  attempts: Attempt[] = [];


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private checkoutService: CheckoutService,
              private router: Router,
              private questionService: QuestionService,
              private attemptService: AttemptService
             ) {}

  ngOnInit(): void {
    this.connectedUser = this.tokenStorage.getUser();
    this.isEnabled = this.connectedUser.locked || false;
    this.loadAttempts();
  }

  loadAttempts(): void {
    this.attemptService.getUserAttempts().subscribe({
      next: (data) => {
        this.attempts = data;
      },
      error: (err) => console.error('Erreur lors du chargement des questions', err)
    });
  }

  categories: Category[] = [
    {id: 1, name: 'La circulation routière', icon: '🚗', groupe:'circulation_routiere'},
    {id: 2, name: 'Le conducteur', icon: '🧑‍✈️ / 🚘', groupe:'conducteur'},
    {id: 3, name: 'La route', icon: '🛣️', groupe:'route'},
    {id: 4, name: 'Les autres usagers', icon: '🚴‍♂️/🛵 /🚶‍♂️', groupe:'usagers'},
    {id: 5, name: 'régles générales', icon: '📘 / 📚', groupe:'regles_generales'},
    {id: 6, name: 'Premiers secours', icon: '⛑️', groupe:'premiers_secours'},
    {id: 7, name: 'Prendre et quitter son véhicule', icon: '🔑/🚗', groupe:'prendre_quitter_vehicule'},
    {id: 8, name: 'Mécanique et entretien du véhicule', icon: '🔧 / 🛠️', groupe:'mecanique'},
    {id: 9, name: 'Sécurité conducteur et routière', icon: '🦺/🚨', groupe:'securite'},
    {id: 10, name: 'Environnement et écoconduite', icon: '🌍/🌱', groupe:'environnement'},
  ];

  simulations: Examen[] = [
    {id: 1, title: 'Examen blanc 1', questions: 40, duration: 10, isAvailable: false},
    {id: 2, title: 'Examen blanc 2', questions: 40, duration: 10, isAvailable: false},
    {id: 3, title: 'Examen blanc 3', questions: 40, duration: 10, isAvailable: false},
    {id: 4, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 5, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 6, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 7, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 8, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 9, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
    {id: 10, title: 'Examen blanc 4', questions: 40, duration: 10, isAvailable: false},
  ];

  selectMode(mode: 'training' | 'simulation' | 'payment') {
    this.mode = mode;
  }

  startCategory(cat: Category) {
    // navigation ex: this.router.navigate(['/training', cat.id]);
  }

  startSimulation(sim: Examen) {
    // navigation ex:
    this.router.navigate(['/examen', sim.id]);
  }




  pay(libelle: string, amount: number) {

    if (this.authService.isTokenExpired()) {
      this.router.navigateByUrl(`connexion`)
    } else {
      var tt = Math.floor(1000 + Math.random() * 9000);
      var today = new Date();
      var tte = formatDate(today, 'MM/dd/yyyy', "en-US");
      var code = tt.toString() + '-' + tte;
      window.sessionStorage.setItem(GlobalConstants.libellecertification, 'theorie');
      window.sessionStorage.setItem(GlobalConstants.libellepaiement, libelle);
      window.sessionStorage.setItem(GlobalConstants.amount, amount.toString());
      window.sessionStorage.setItem(GlobalConstants.codepaiement, code);


      this.checkoutService.checkout(amount); // 19,99 €
    }

  }



  ouvrirPopup(categorie: any) {
    this.popupVisible = true;
    this.loading = true;
    this.error = null;
    this.activites = [];
    this.categorieCourante = categorie;

    this.questionService.getActiviteCategory(this.categorieCourante.groupe).subscribe({
        next: (data) => {
          this.activites = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Impossible de charger les activités.';
          this.loading = false;
        }
      });
  }


  fermerPopup() {
    this.popupVisible = false;
  }

  lancerActivite(act: number) {
    this.popupVisible = false;
    this.router.navigateByUrl(`quiz/activite/`);
    this.router.navigate(['quiz/activite/', act]);
  }

  lancerLaVisualisation(attempt : Attempt) {
    sessionStorage.setItem("attempt", JSON.stringify(attempt));
    this.router.navigateByUrl(`resultat-examen/`);
    this.router.navigate(['resultat-examen/', attempt.id]);
  }

}
