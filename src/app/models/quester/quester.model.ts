export class Quester {
  id : number;
  username : string;
  email : string;
  birthDate : Date;
  isActive : boolean;
  isAdmin : boolean;
  isBanned : boolean;
  Strikes : number;
  backgroundId : number;
  bio : string;
  onlinePlay : boolean;
  offlinPlay : boolean;
  postalCode : number;
  token : string;
}

export class NewQuester {
  username : string;
  email : string;
  password : string;
  birthDate : Date;
}
