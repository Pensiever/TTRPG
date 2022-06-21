import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewQuester, Quester } from '../models/quester/quester.model';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseAdress = environment.baseUrl;

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  getAllFavoriteGames() : Observable<Game[]> {
    return this._client.get<Game[]>(this.baseAdress+"/FavoriteGames")
  }
}
