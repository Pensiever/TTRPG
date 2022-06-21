import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quester } from '../models/quester/quester.model';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Background } from '../models/background/background.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  private baseAdress = environment.baseUrl;

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  currentQuester : Quester;

  getBackground(id : number) : Observable<Background> {
    return this._client.get<Background>(this.baseAdress+"/Backgrounds/"+id)
  }

  getAllBackgrounds() : Observable<Background[]> {
    return this._client.get<Background[]>(this.baseAdress+"/Backgrounds")
  }
}
