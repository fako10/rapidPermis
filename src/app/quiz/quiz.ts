import {Component, OnInit} from '@angular/core';
import {Question} from '../_models/question.model';
import {QuestionService} from '../_services/question.service';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [
    NgIf
  ],
  templateUrl: './quiz.html',
  standalone: true,
  styleUrl: './quiz.css'
})
export class Quiz implements OnInit {


  questions: Question[] = [];
  userAnswers: { [key: number]: string } = {};
  score: number = 0;
  category!: string;
  showResult = false;
  isCorrect = false;
  selectedAnswer: number | null = null;
  currentIndex = 0;
  quizFinished = false;
  loading = true;
  error: string | null = null;
  strSelectedAnswer: string ='' ;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    console.log("je passe ici");
    this.questionService.getQuestionsByCategory(this.category).subscribe({
      next: (data) => {
        console.log(data);
        this.questions = data;
        this.loading = false;
        console.log(this.questions);
      },
      error: (err) => console.error('Erreur lors du chargement des questions', err)
    });
  }

  /*selectAnswer1(index: number): void {
    if (this.showResult) return;
    this.selectedAnswer = index;
    this.isCorrect = index === this.questions[this.currentIndex].correctAnswer;
    this.showResult = true;

    if (this.isCorrect) this.score++;
  }*/

  selectAnswer(questionId: number, answer: string): void {
    if (this.showResult) return;
    this.strSelectedAnswer = answer;
    this.isCorrect = answer === this.questions[this.currentIndex].correctAnswer;
    this.showResult = true;
    if (this.isCorrect) this.score++;
    //this.userAnswers[questionId] = answer;
  }

  submitQuiz(): void {
    let correct = 0;
    this.questions.forEach(q => {
      if (this.userAnswers[q.id!] === q.correctAnswer) {
        correct++;
      }
    });
    this.score = correct;
  }

  retrieveImage(file: File | undefined): any {
    console.log('nom photo' + file?.name)
    return   'data:image/jpeg;base64,' + file;
  }

  nextQuestion(): void {
    this.showResult = false;
    this.selectedAnswer = null;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.quizFinished = true;
    }
  }

  restartQuiz(): void {
    this.currentIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.quizFinished = false;
    this.selectedAnswer = null;
  }

}
