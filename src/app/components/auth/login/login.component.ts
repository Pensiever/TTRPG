import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFG : FormGroup
  isConnected : Boolean

  constructor(
    private _builder : FormBuilder,
    private _authService : AuthService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.loginFG = this._builder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit(){
    const values = this.loginFG.value;

    this._authService.login(values['username'], values['password'])

  }

  logout(){
    this._authService.logout()
  }
}
