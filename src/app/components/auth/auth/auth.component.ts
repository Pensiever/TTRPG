import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quester } from 'src/app/models/quester/quester.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isConnectedSub : Subscription;
  currentQuester : Quester = new Quester();
  connected : boolean;

  get test() : string {
    return localStorage.getItem('role')??''
  }

  constructor(
    private _authService :AuthService
  ) { }

  ngOnInit(): void {

    this._authService.currentQuesterSubject.subscribe((q : Quester)=> {this.currentQuester = q;})

    this.isConnectedSub = this._authService.isConnectedSubject.subscribe(
       (x : boolean) => {

          this.connected = x
        }
     )
     this._authService.emitQuester()
     this._authService.emitIsConnected()

  }

  logout(){
    this._authService.logout()
  }

}
