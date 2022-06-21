import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewQuester, Quester } from '../models/quester/quester.model';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseAdress = environment.baseUrl;

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  getAllFavoriteGenres() : Observable<Genre[]> {
    return this._client.get<Genre[]>(this.baseAdress+"/FavoriteGenres")
  }
}
