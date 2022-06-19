import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quester } from '../models/quester/quester.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Toast} from 'primeng/toast'
import { QuesterService } from './quester.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isConnected : boolean

  private baseAdress = environment.baseUrl;

  currentQuester? : Quester;

  get isConnected(): boolean {
    return localStorage.getItem('token') != null ? true : false
  }

  isConnectedSubject : Subject<boolean> = new Subject<boolean>();
  currentQuesterSubject : Subject<Quester> = new Subject<Quester>();

  emitQuester() {
    if(this.currentQuester == null && localStorage.getItem('id')) {
      this._quester.getProfile(Number.parseInt(localStorage.getItem('id')??'')).subscribe((data : Quester) => {
        this.currentQuester = data
        this.currentQuesterSubject.next(this.currentQuester)
      })
    }
    else this.currentQuesterSubject.next(this.currentQuester!)
  }


  emitIsConnected() {
    this.isConnectedSubject.next(this.isConnected)
  }

  constructor(
    private _client : HttpClient,
    private _route : Router,
    private _toast : Toast,
    private _quester : QuesterService
  ) { }

  login(username : string, password : string){
    var quester = new LoginInfo();
    quester.username = username;
    quester.password = password;
    this._client.post<Quester>(this.baseAdress+"/Auth/auth",quester).subscribe({
      next : (data : Quester) => {
        this.currentQuester = data;
        localStorage.setItem("token", this.currentQuester.token)
        localStorage.setItem("role", this.currentQuester.isAdmin ? "admin" : "quester")
        localStorage.setItem('id', data.id.toString())
        this.emitQuester()
        this._toast.messageService.add({severity:'info', summary: 'Bienvenu', detail:'Vous êtes connecté!'});
        this._route.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
       },
      error : error =>  {console.log(error); console.log("Erreur")}
    })
  }

  logout(){
    this.currentQuester = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear()
    this.emitQuester()
    this._route.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }
}
export class LoginInfo {
  username : string;
  password : string;
}
