import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewQuester } from 'src/app/models/quester/quester.model';
import { QuesterService } from '../../../services/quester.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newQuesterFG : FormGroup

  constructor(
    private _service : QuesterService,
    private _builder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.newQuesterFG = this._builder.group({
      username : ['', Validators.required],
      email : ['', [Validators.email, Validators.required]],
      password : ['', Validators.required],
      birthDate : ['', Validators.required]
    })
  }

  onSubmit(){
    let values = this.newQuesterFG.value
    let newQuester = new NewQuester()
    newQuester.username = values['username']
    newQuester.email = values['email']
    newQuester.password = values['password']
    newQuester.birthDate = values['birthDate']

    this._service.register(newQuester)
  }

}
