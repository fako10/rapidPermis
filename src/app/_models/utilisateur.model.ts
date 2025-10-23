export class  Utilisateur {

  id?:               number;
  username?:         string;
  email?:            string;
  password!:         string;
  userRole?:         string;
  enabled?:          boolean;


  constructor(
  ) {
    this.userRole = 'USER';
  }
}
