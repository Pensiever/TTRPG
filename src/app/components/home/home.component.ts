import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { Background } from 'src/app/models/background/background.model';
import { Quester } from 'src/app/models/quester/quester.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuesterService } from '../../services/quester.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentQuester : Quester
  backgroundId : Background

  constructor(
    private _service : QuesterService,
    private _back : BackgroundService,
    private _auth : AuthService,
  ) { }

  ngOnInit(): void {
    this._back.getBackground(this._auth.currentQuester.id).subscribe((b : Background) => {this.backgroundId = b})
  }

}
