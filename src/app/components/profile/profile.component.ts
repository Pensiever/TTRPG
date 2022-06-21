import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quester } from 'src/app/models/quester/quester.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuesterService } from '../../services/quester.service';
import { BackgroundService } from '../../services/background.service';
import { Background } from 'src/app/models/background/background.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  NewBioFG : FormGroup
  currentQuester : Quester
  backgroundId : Background

  constructor(
    private _service : QuesterService,
    private _back : BackgroundService,
    private _auth : AuthService,
    private _builder : FormBuilder,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._service.getProfile(Number(localStorage.getItem("id"))).subscribe(
      (q : Quester) => {return this.currentQuester = q}
    )
    this._back.getBackground(this.currentQuester.id).subscribe((b : Background) => {return this.backgroundId = b})
    this.NewBioFG = this._builder.group({
      bio : ['', Validators.required]
    })
  }

  onSubmitBio() {
    let values = this.NewBioFG.value
    let quester = new Quester()

    quester.id = this.currentQuester.id
    quester.username = this.currentQuester.username
    quester.email = this.currentQuester.email
    quester.birthDate = this.currentQuester.birthDate
    quester.isActive = this.currentQuester.isActive
    quester.isAdmin = this.currentQuester.isAdmin
    quester.isBanned = this.currentQuester.isBanned
    quester.Strikes = this.currentQuester.Strikes
    quester.backgroundId = this.currentQuester.backgroundId
    quester.bio = values.bio
    quester.onlinePlay = this.currentQuester.onlinePlay
    quester.offlinePlay = this.currentQuester.offlinePlay
    quester.postalCode = this.currentQuester.postalCode

    this._service.updateQuester(quester)
  }

  onSubmitOnline() {
    let value : boolean
    let quester = new Quester()

    if (this.currentQuester.onlinePlay===true) {
      value = false
    } else {
      value = true
    }

    quester.id = this.currentQuester.id
    quester.username = this.currentQuester.username
    quester.email = this.currentQuester.email
    quester.birthDate = this.currentQuester.birthDate
    quester.isActive = this.currentQuester.isActive
    quester.isAdmin = this.currentQuester.isAdmin
    quester.isBanned = this.currentQuester.isBanned
    quester.Strikes = this.currentQuester.Strikes
    quester.backgroundId = this.currentQuester.backgroundId
    quester.bio = this.currentQuester.bio
    quester.onlinePlay = value
    quester.offlinePlay = this.currentQuester.offlinePlay
    quester.postalCode = this.currentQuester.postalCode

    this._service.updateQuester(quester)
  }

  onSubmitOffline() {
    let value : boolean
    let quester = new Quester()

    if (this.currentQuester.offlinePlay===true) {
      value = false
    } else {
      value = true
    }

    quester.id = this.currentQuester.id
    quester.username = this.currentQuester.username
    quester.email = this.currentQuester.email
    quester.birthDate = this.currentQuester.birthDate
    quester.isActive = this.currentQuester.isActive
    quester.isAdmin = this.currentQuester.isAdmin
    quester.isBanned = this.currentQuester.isBanned
    quester.Strikes = this.currentQuester.Strikes
    quester.backgroundId = this.currentQuester.backgroundId
    quester.bio = this.currentQuester.bio
    quester.onlinePlay = this.currentQuester.onlinePlay
    quester.offlinePlay = value
    quester.postalCode = this.currentQuester.postalCode

    this._service.updateQuester(quester)
  }
}
