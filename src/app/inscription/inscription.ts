import {Component, OnInit} from '@angular/core';
import {Utilisateur} from '../_models/utilisateur.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnregistrerPaiement} from '../_models/enregistrer.paiement';
import {CommonModule, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIf,
    RouterLink
  ],
  styleUrl: './inscription.css'
})
export class Inscription implements OnInit {

  utilisateur!: Utilisateur;
  enregistrementPaiement !: EnregistrerPaiement;
  isFormInValid = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successfullMessage = '';
  userType !: string;
  confirmationMotDePasse = '';

  constructor(
    private authService: AuthService,
    private router : Router ,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();

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
  onCancel(): void {
    this.isFormInValid = false;
    this.isSuccessful = false;
    this.isSignUpFailed = false;
  }

}
