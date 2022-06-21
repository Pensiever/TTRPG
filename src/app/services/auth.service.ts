import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quester } from '../models/quester/quester.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { QuesterService } from './quester.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isConnected : boolean

  private baseAdress = environment.baseUrl;

  currentQuester : Quester;

  get isConnected(): boolean {
    return localStorage.getItem('token') != null ? true : false
  }

  isConnectedSubject : Subject<boolean> = new Subject<boolean>();
  currentQuesterSubject : Subject<Quester> = new Subject<Quester>();

  emitQuester() {
    if(this.currentQuester == null && localStorage.getItem('id')) {
      this._quester.getProfile(Number.parseInt(localStorage.getItem('id'))).subscribe((data : Quester) => {
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
    private _quester : QuesterService,
    private messageService: MessageService
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
        this.messageService.add({severity:'info', summary: 'Bienvenu', detail:'Vous êtes connecté!', life:6000});
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
    localStorage.removeItem('id');
    localStorage.clear()
    this.emitQuester()
    this._route.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }
}
export class LoginInfo {
  username : string;
  password : string;
}
