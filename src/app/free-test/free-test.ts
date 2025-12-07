import {Component, OnInit} from '@angular/core';
import {Question} from '../_models/question.model';
import {interval, Subscription} from 'rxjs';
import {ExamenService} from '../_services/examen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utilisateur} from '../_models/utilisateur.model';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token.storage.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {EnregistrerPaiement} from '../_models/enregistrer.paiement';

@Component({
  selector: 'app-free-test',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './free-test.html',
  standalone: true,
  styleUrl: './free-test.css'
})
export class FreeTest implements OnInit {


  questions: Question[] = [];
  currentIndex = 0;
  timeLeft = 15; // secondes par question
  timerSub: Subscription | null = null;
  userAnswers: { [questionId: number]: string | null } = {};
  startedAt: string = new Date().toISOString();
  isFinished = false;
  result: any = null;

  speech: SpeechSynthesis | null = null;
  utterance: SpeechSynthesisUtterance | null = null;
  ttsEnabled = true;

  isLoggedIn = false;
  username?: string;
  connectedUser!: Utilisateur;
  started = false;



  utilisateur!: Utilisateur;
  enregistrementPaiement !: EnregistrerPaiement;
  isFormInValid = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successfullMessage = '';
  userType !: string;
  confirmationMotDePasse = '';

  constructor(private examService: ExamenService,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router : Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.startExam();
    } else {

    }

    // démarre par défaut, ou tu peux attendre action utilisateur
  }

  startExam() {
    this.startedAt = new Date().toISOString();
    const category = '';
    const nbr = 50;
    this.examService.startTraining(category, nbr).subscribe({
      next: data => {
        this.questions = data;
        this.questions.forEach(q => this.userAnswers[q.id!] = null);
        this.currentIndex = 0;
        this.startTimer();
        this.speakCurrentQuestion();
      },
      error: err => console.error('Erreur start exam', err)
    });
  }


  startTimer() {
    this.timeLeft = 15;
    if (this.timerSub) this.timerSub.unsubscribe();
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.onTimeUp();
      }
    });
  }

  onTimeUp() {
    // si aucune réponse, on sauve null et avance
    const q = this.questions[this.currentIndex];
    if (this.userAnswers[q.id!] === null) {
      this.userAnswers[q.id!] = null; // explicite
    }
    this.nextQuestion();
  }

  selectAnswer(qId: number, answer: string) {
    this.userAnswers[qId] = answer;
    // on peut avancer automatiquement dès qu'il répond
    // this.nextQuestion();
  }

  nextQuestion() {
    if (this.timerSub) { this.timerSub.unsubscribe(); this.timerSub = null; }
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.startTimer();
      this.speakCurrentQuestion();
    } else {
      this.finishExam();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      if (this.timerSub) { this.timerSub.unsubscribe(); }
      this.currentIndex--;
      this.startTimer();
      this.speakCurrentQuestion();
    }
  }

  speakCurrentQuestion() {
    if (!this.ttsEnabled || !('speechSynthesis' in window)) return;
    if (this.utterance) {
      this.speech?.cancel();
    }
    const q = this.questions[this.currentIndex];
    const text = `${this.currentIndex + 1}. ${q.intitule}. Réponses : A. ${q.reponseA}. B. ${q.reponseB}. C. ${q.reponseC}. D. ${q.reponseD}.`;
    this.utterance = new SpeechSynthesisUtterance(text);
    // Optionnel : choisir la voix/lang
    this.utterance.lang = 'fr-FR';
    this.speech?.speak(this.utterance);
  }

  finishExam() {
    this.isFinished = true;
    if (this.timerSub) { this.timerSub.unsubscribe(); this.timerSub = null; }
    // Construire payload
    const answersPayload = Object.keys(this.userAnswers).map(k => ({
      questionId: +k,
      givenAnswer: this.userAnswers[+k]
    }));
    const payload = {
      userId: this.getCurrentUserId(), // méthode à adapter
      startedAt: this.startedAt,
      answers: answersPayload
    };
    this.examService.submitAttempt(payload).subscribe({
      next: res => {
        this.result = res;

      },
      error: err => console.error('Erreur submit', err)
    });
  }

  getCurrentUserId(): number {
    // TODO: remplacer par récupération depuis le token / service utilisateur authentifié
    const uid = localStorage.getItem('userId');
    return uid ? +uid : 1;
  }

  ngOnDestroy(): void {
    if (this.timerSub) this.timerSub.unsubscribe();
    this.speech?.cancel();
  }


  retrieveImage(file: File | undefined): any {
    return   'data:image/jpeg;base64,' + file;
  }





  onSubmit(): void {

    if(this.confirmationMotDePasse != this.utilisateur.password) {
      this.isFormInValid = true
    } else {
      this.utilisateur.userRole = 'USER';
      this.authService.registerUser(this.utilisateur).subscribe({
        next: (value) => {

          this.isSuccessful = true;
          this.isSignUpFailed = false;
          // @ts-ignore
          this.authService.savePassword(this.utilisateur.password);
          this.successfullMessage = "Inscription réussie ✅";
          this.router.navigateByUrl(`connexion`);
        },
        error: e => {
          this.isSignUpFailed = true;
          this.errorMessage = e.error.message;
        }
      });
      //this.router.navigateByUrl('/acceuil');
    }
  }

  start(): void {
    this.started  = true;
  }
}
