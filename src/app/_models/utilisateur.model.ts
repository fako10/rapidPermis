export class  Utilisateur {

  id?: number;
  username?:                string;
  email?:                   string;
  password!:                string;
  userRole?:                string;
  enabled?:                 boolean;
  locked?:                 boolean;
  hasPreparationAccess?:    boolean;


  constructor(
  ) {
    this.userRole = 'USER';
  }
}
