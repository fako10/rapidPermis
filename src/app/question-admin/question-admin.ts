import {Component, OnInit} from '@angular/core';
import {Question} from '../_models/question.model';
import {QuestionService} from '../_services/question.service';
import {FormsModule} from '@angular/forms';
import {formatDate, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-question-admin',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './question-admin.html',
  standalone: true,
  styleUrl: './question-admin.css'
})
export class QuestionAdmin implements OnInit {

  questions: Question[] = [];
  currentQuestion: Question = this.emptyQuestion();
  isEditing = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  editingQuestion: Question | null = null;
  questionSave?: Question ;
  selectedFiles : File [] = [];
  newQuestion: Question = {
    category: '',
    reponseA: '',
    reponseB: '',
    reponseC: '',
    reponseD: '',
    intitule: '',
    reponseCorrecte: ''
  };

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  emptyQuestion(): Question {
    return {
      category: '',
      reponseA: '',
      reponseB: '',
      reponseC: '',
      reponseD: '',
      intitule: '',
      reponseCorrecte: ''
    };
  }

  loadQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: data => this.questions = data,
      error: err => console.error('Erreur chargement', err)
    });
  }

  public onFileChanged(event: Event) {
    // @ts-ignore
    this.selectedFiles = event.target.files;

  }


  editQuestion(q: Question) {
    this.editingQuestion = { ...q };
  }

  deleteQuestion(id: number) {
    if (confirm('Supprimer cette question ?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => this.loadQuestions()
      });
    }
  }

  cancelEdit() {
    this.editingQuestion = null;
  }

  saveQuestion() {
    if (this.editingQuestion) {
      this.questionService.updateQuestion(this.editingQuestion.id!, this.editingQuestion).subscribe({
        next: () => {
          this.loadQuestions();
          this.editingQuestion = null;
        }
      });
    } else {
      let dateAnnonce = new Date();
      const cValue = formatDate(dateAnnonce, 'yyyyMMddhhmmss', 'en-US');
      this.currentQuestion.codeQuestion = cValue;
      this.questionService.createQuestion(this.currentQuestion).subscribe({
        next: (value) => {
          this.questionSave = value;
          let id = value.examen == null ? 0 : value.examen;
          this.questionService.addPhoto(cValue, this.selectedFiles).subscribe(data => {

          });
          this.loadQuestions();
          this.currentQuestion = {
            intitule: '',
            category: '',
            reponseA: '',
            reponseB: '',
            reponseC: '',
            reponseD: '',
            reponseCorrecte: ''
          };
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }


}
